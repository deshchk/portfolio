import { glob } from "astro/loaders"
import { z, defineCollection } from "astro:content"

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "./src/blog/" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
    pubDate: z.date(),
    tags: z.array(z.string())
  })
})

export const collections = { blog }