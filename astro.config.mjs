// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import preact from '@astrojs/preact'
import { remarkReadingTime } from "./plugins/remark-readng-time.mjs"

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [preact()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  }
})