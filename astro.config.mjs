// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Canonical host Vercel assigned. No custom domain in this build.
export default defineConfig({
  site: "https://personal-site-pearl-tau-17.vercel.app",
  output: "static",
  base: "/",
  vite: {
    plugins: [tailwindcss()],
  },
});
