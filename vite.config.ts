import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    ui({
      ui: {
        navigationMenu: {
          compoundVariants: [
            {
              variant: 'link',
              active: true,
              highlight: false,
              class: {
                link: 'text-2xl font-extrabold  after:content-[""] after:absolute after:bottom-[-3px] after:left-0 after:w-full after:h-[3px] after:bg-black dark:after:bg-white after:transition-all after:duration-300 after:ease-in-out',
              },
            },
          ],
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
