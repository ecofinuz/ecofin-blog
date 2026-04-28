import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const blog = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        author: z.string(),
        date: z.coerce.date(),
        category: z.enum([
            "kredit",
            "birja",
            "tilla",
            "treyding",
            "pul-saqlash",
            "inqirozlar",
            "boshqalar",
        ]),
        translationKey: z.string(),
        series: z
            .object({
                name: z.string(),
                part: z.number(),
            })
            .optional(),
    }),
});

export const collections = { blog };
