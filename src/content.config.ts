import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    author: z.string(),
    authorRole: z.string().optional(),
    avatar: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const glossary = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/glossary' }),
  schema: z.object({
    title: z.string(),
    acronym: z.string().optional(),
    category: z.enum(['Fundamentos', 'Comunidad', 'Compute', 'Storage', 'Database', 'Analytics', 'Security', 'Network', 'AI/ML', 'DevOps', 'Roles', 'Optimización', 'Pro Tips']),
    section: z.number().min(1).max(10).optional(),
    description: z.string(),
    useCase: z.string(),
    awsLink: z.string().url().optional(),
    relatedServices: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, glossary };
