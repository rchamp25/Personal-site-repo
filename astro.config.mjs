// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// `site` stays unset until Vercel assigns the real *.vercel.app host (see AGENTS.md).
export default defineConfig({
  output: "static",
  base: "/",
  vite: {
    plugins: [tailwindcss()],
  },
});
