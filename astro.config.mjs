import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://logicinczo.github.io",
  base: "/open-gym",
  trailingSlash: "ignore",
  build: { format: "directory" },
  devToolbar: { enabled: false },
});
