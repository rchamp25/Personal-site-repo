// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Canonical host: Ross's custom domain on Vercel. www redirects here.
export default defineConfig({
  site: "https://rosschamplin.com",
  output: "static",
  base: "/",
  integrations: [
    // sitemap-index.xml at the root. URLs drop the trailing slash so they
    // match each page's canonical link (Base.astro).
    sitemap({
      serialize(item) {
        item.url = item.url.replace(/(?<=[^/])\/$/, "");
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
