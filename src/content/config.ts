import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string().optional(),
    keywords: z.string().optional(),
    focus_keyword: z.string().optional(),
    author: z.string().optional(),
    domain: z.string().optional(),
    date: z.string().optional(),
    created: z.string().optional(),
    type: z.string().optional(),
    status: z.string().optional(),
    word_count_target: z.string().optional(),
    framework: z.string().optional(),
  }),
});

export const collections = { articles };
