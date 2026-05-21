import { render, type CollectionEntry } from "astro:content";

export type BlogLocale = "uz" | "en" | "ru";

type BlogPost = CollectionEntry<"blog">;

const localeTags: Record<BlogLocale, string> = {
    uz: "uz-UZ",
    en: "en-US",
    ru: "ru-RU",
};

export function getMinutesRead(frontmatter: unknown): number {
    if (!frontmatter || typeof frontmatter !== "object") {
        return 1;
    }

    const value = (frontmatter as { minutesRead?: unknown }).minutesRead;
    const minutes =
        typeof value === "number"
            ? value
            : typeof value === "string"
              ? Number.parseFloat(value)
              : 1;

    return Number.isFinite(minutes) ? Math.max(1, Math.ceil(minutes)) : 1;
}

export function formatReadingTime(
    minutesRead: number,
    locale: BlogLocale,
): string {
    const minutes = Math.max(1, Math.ceil(minutesRead));
    const formattedMinutes = new Intl.NumberFormat(localeTags[locale]).format(
        minutes,
    );

    switch (locale) {
        case "uz":
            return `${formattedMinutes} daqiqalik o'qish`;
        case "ru":
            return `${formattedMinutes} мин чтения`;
        case "en":
        default:
            return `${formattedMinutes} min read`;
    }
}

export async function getPostsWithReadingTime<T extends BlogPost>(
    posts: T[],
): Promise<Array<{ post: T; minutesRead: number }>> {
    return Promise.all(
        posts.map(async (post) => {
            const { remarkPluginFrontmatter } = await render(post);

            return {
                post,
                minutesRead: getMinutesRead(remarkPluginFrontmatter),
            };
        }),
    );
}
