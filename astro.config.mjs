// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import preact from '@astrojs/preact'
import { remarkReadingTime } from "./plugins/remark-reading-time.mjs"

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [preact(), mdx()],

  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
})