import type { CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

type PostPath = {
    locale: string;
    category: string;
    slug: string;
};

export type SeriesNavigation = {
    previousPost?: BlogPost;
    nextPost?: BlogPost;
};

function getPostPath(id: string): PostPath {
    const [locale, category, ...slugParts] = id.split("/");

    return {
        locale,
        category,
        slug: slugParts.join("/"),
    };
}

export function getPostHref(post: BlogPost): string {
    const { locale, category, slug } = getPostPath(post.id);
    const localePrefix = locale === "uz" ? "" : `/${locale}`;

    return `${localePrefix}/${category}/${slug}/`;
}

export function getSeriesNavigation(
    currentPost: BlogPost,
    posts: BlogPost[],
): SeriesNavigation {
    const currentPart = currentPost.data.part;

    if (!currentPart) {
        return {};
    }

    const currentPath = getPostPath(currentPost.id);
    const seriesPosts = posts
        .filter((post) => {
            const path = getPostPath(post.id);

            return (
                typeof post.data.part === "number" &&
                path.locale === currentPath.locale &&
                path.category === currentPath.category
            );
        })
        .sort((a, b) => a.data.part! - b.data.part!);

    if (seriesPosts.length <= 1) {
        return {};
    }

    const currentIndex = seriesPosts.findIndex(
        (post) => post.id === currentPost.id,
    );

    if (currentIndex === -1) {
        return {};
    }

    return {
        previousPost: seriesPosts[currentIndex - 1],
        nextPost: seriesPosts[currentIndex + 1],
    };
}
