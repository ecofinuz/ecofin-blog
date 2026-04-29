import rss from "@astrojs/rss";
import type { AuthorKey } from "@data/authors";
import { getAuthor } from "@data/authors";
import type { CategoryKey } from "@data/categories";
import { categories } from "@data/categories";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
    const posts = await getCollection("blog", ({ id }) => id.startsWith("uz/"));

    const sorted = posts.sort(
        (a, b) => b.data.date.getTime() - a.data.date.getTime(),
    );

    return rss({
        title: "Ecofin Blog",
        description: "Moliyaviy savodxonlik va iqtisodiy bilimlar",
        site: context.site!,
        items: sorted.map((post) => {
            const parts = post.id.split("/");
            const author = getAuthor(post.data.author as AuthorKey);
            const catKey = parts[1] as CategoryKey;
            const slug = parts[2];
            const catSlug = categories[catKey]?.uz?.slug ?? catKey;
            const catLabel = categories[catKey]?.uz?.label ?? catKey;

            return {
                title: post.data.title,
                description: post.data.description,
                pubDate: post.data.date,
                link: `/uz/${catSlug}/${slug}/`,
                author: author.name,
                categories: [catLabel],
            };
        }),
        customData: `<language>uz</language>`,
    });
}
