import fs from "node:fs";
import { fileURLToPath, URL } from "node:url";

import ui from "@nuxt/ui/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";
import VueRouter from "vue-router/vite";

// Custom Vite plugin to auto-generate LayoutName type
function autoLayoutTypes() {
  const updateTypes = () => {
    const layoutsDir = fileURLToPath(new URL("./src/layouts", import.meta.url));
    if (!fs.existsSync(layoutsDir)) return;
    const layouts = fs.readdirSync(layoutsDir)
      .filter(file => file.endsWith(".vue"))
      .map(file => file.replace(".vue", ""));

    const typeDef = `export type LayoutName = ${layouts.map(l => `'${l}'`).join(" | ") || "string"};\n`;
    fs.writeFileSync(fileURLToPath(new URL("./src/layout-types.d.ts", import.meta.url)), typeDef);
  };

  return {
    name: "auto-layout-types",
    buildStart() {
      updateTypes();
    },
    configureServer(server: { watcher: { on: (arg0: string, arg1: { (file: any): void; (file: any): void }) => void } }) {
      server.watcher.on("add", (file) => {
        if (file.includes("src\\\\layouts") || file.includes("src/layouts")) updateTypes();
      });
      server.watcher.on("unlink", (file) => {
        if (file.includes("src\\\\layouts") || file.includes("src/layouts")) updateTypes();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    autoLayoutTypes(),
    VueRouter(),
    vue(),
    vueDevTools(),
    ui({
      colorMode: false,
      theme: {
        transitions: true,
      },
      ui: {
        colors: {
          primary: "gold",
          neutral: "ivory",
        },
        navigationMenu: {
          compoundVariants: [
            {
              variant: "link",
              active: true,
              highlight: false,
              class: {
                link: "text-2xl font-extrabold  after:content-[\"\"] after:absolute after:bottom-[-3px] after:left-0 after:w-full after:h-[3px] after:bg-black dark:after:bg-white after:transition-all after:duration-300 after:ease-in-out",
              },
            },
          ],
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
