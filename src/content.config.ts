import { categories } from "@data/categories";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

// Build a flat list of all valid slugs across all locales
const allCategorySlugs = Object.values(categories)
    .flatMap((locales) => Object.values(locales).map((l) => l.slug))
    // Remove duplicates
    .filter((slug, i, arr) => arr.indexOf(slug) === i) as [string, ...string[]];

const blog = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        author: z.string(),
        date: z.coerce.date(),
        category: z.enum(allCategorySlugs),
        translationKey: z.string(),
        series: z
            .object({
                part: z.number(),
            })
            .optional(),
    }),
});

export const collections = { blog };
