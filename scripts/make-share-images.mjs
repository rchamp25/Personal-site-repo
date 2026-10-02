// Builds the static share images in public/ from public/favicon.svg and the
// name and role in src/content/profile.yaml:
//   favicon-32.png, apple-touch-icon.png (180), favicon.ico, og.png (1200x630)
// Run it again after changing the favicon, your name, or your role line:
//   npm run share-images
// It renders with a local Chromium browser (Edge or Chrome) in headless mode.
// Set BROWSER_PATH if yours is not at one of the default paths below.
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const pub = join(root, "public");

const candidates = [
  process.env.BROWSER_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const browser = candidates.find((p) => existsSync(p));
if (!browser) throw new Error("No Chromium browser found. Set BROWSER_PATH.");

// Name and role from profile.yaml (simple one-line scalars).
const profile = readFileSync(join(root, "src/content/profile.yaml"), "utf8");
const field = (key) => {
  const m = profile.match(new RegExp(`^\\s+${key}:\\s*(.+)$`, "m"));
  if (!m) throw new Error(`profile.yaml: ${key} not found`);
  return m[1].trim().replace(/^["']|["']$/g, "");
};
const name = field("name");
const role = field("role");
const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const fonts = pathToFileURL(join(pub, "fonts")).href;
const favicon = pathToFileURL(join(pub, "favicon.svg")).href;
const iconPage = (size) => `<!doctype html><html><head><style>html,body{margin:0;background:#12110f}</style></head>
<body><img src="${favicon}" width="${size}" height="${size}" style="display:block"></body></html>`;
// The social preview: same tokens and fonts as the site.
const ogPage = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"Instrument Serif";src:url("${fonts}/instrument-serif-regular.woff2") format("woff2")}
@font-face{font-family:Newsreader;src:url("${fonts}/newsreader-variable.woff2") format("woff2");font-weight:200 800}
@font-face{font-family:"IBM Plex Mono";src:url("${fonts}/ibm-plex-mono-variable.woff2") format("woff2");font-weight:100 700}
html,body{margin:0;width:1200px;height:630px;background:#12110f;color:#f4f0e6}
.frame{position:absolute;inset:40px;border:1px solid #2c2924}
.meta{position:absolute;left:96px;top:84px;font:500 20px/1 "IBM Plex Mono";letter-spacing:.12em;text-transform:uppercase;color:#b7b1a6}
.name{position:absolute;left:92px;top:200px;font:400 148px/1 "Instrument Serif"}
.rule{position:absolute;left:96px;top:384px;width:96px;border-top:3px solid #e07a4a}
.role{position:absolute;left:96px;top:424px;right:96px;font:400 44px/1.25 Newsreader}
</style></head><body>
<div class="frame"></div>
<div class="meta">rosschamplin.com</div>
<div class="name">${escapeHtml(name)}</div>
<div class="rule"></div>
<div class="role">${escapeHtml(role)}</div>
</body></html>`;

const work = mkdtempSync(join(tmpdir(), "share-images-"));
const port = 9400 + Math.floor(Math.random() * 400);
const proc = spawn(browser, ["--headless=new", "--disable-gpu", `--remote-debugging-port=${port}`, `--user-data-dir=${join(work, "profile")}`, "--allow-file-access-from-files", "about:blank"]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
try {
  let targets;
  for (let i = 0; i < 60 && !targets; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch { await sleep(250); }
  }
  if (!targets) throw new Error("Browser did not start.");
  const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const render = async (html, width, height) => {
    const file = join(work, `page-${width}x${height}.html`);
    writeFileSync(file, html);
    await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
    await send("Page.navigate", { url: pathToFileURL(file).href });
    await sleep(1200);
    await send("Runtime.evaluate", { expression: "document.fonts.ready.then(() => 1)", awaitPromise: true });
    const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width, height, scale: 1 } });
    return Buffer.from(shot.result.data, "base64");
  };

  const png32 = await render(iconPage(32), 32, 32);
  writeFileSync(join(pub, "favicon-32.png"), png32);
  writeFileSync(join(pub, "apple-touch-icon.png"), await render(iconPage(180), 180, 180));
  writeFileSync(join(pub, "og.png"), await render(ogPage, 1200, 630));

  // favicon.ico: one 32x32 PNG inside an ICO container.
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // one image
  header.writeUInt8(32, 6); // width
  header.writeUInt8(32, 7); // height
  header.writeUInt8(0, 8); // palette
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png32.length, 14); // image size
  header.writeUInt32LE(22, 18); // image offset
  writeFileSync(join(pub, "favicon.ico"), Buffer.concat([header, png32]));

  ws.close();
  console.log(`Wrote favicon-32.png, apple-touch-icon.png, favicon.ico, og.png (name "${name}", role "${role}").`);
} finally {
  proc.kill();
  await sleep(500);
  rmSync(work, { recursive: true, force: true });
}
