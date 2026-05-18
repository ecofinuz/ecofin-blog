import rss from "@astrojs/rss";
import type { AuthorKey } from "@data/authors";
import { getAuthor } from "@data/authors";
import { getCategoryDetailsFromSlug } from "@data/categories";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
    const posts = await getCollection("blog", ({ id }) => id.startsWith("en/"));

    const sorted = posts.sort(
        (a, b) => b.data.date.getTime() - a.data.date.getTime(),
    );

    return rss({
        title: "Ecofin Blog",
        description: "Financial literacy and economic knowledge",
        site: context.site!,
        items: sorted.map((post) => {
            const parts = post.id.split("/");
            const author = getAuthor(post.data.author as AuthorKey);
            const cat = getCategoryDetailsFromSlug(parts[1], "en");
            const slug = parts[2];

            return {
                title: post.data.title,
                description: post.data.description,
                pubDate: post.data.date,
                link: `/en/${cat.slug}/${slug}/`,
                author: author.name,
                categories: [cat.label],
            };
        }),
        customData: `<language>en</language>`,
    });
}
