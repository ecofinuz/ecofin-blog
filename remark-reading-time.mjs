import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

const wordsPerMinuteByLocale = {
    uz: 180,
    en: 220,
    ru: 180,
};

function getLocaleFromFile(file) {
    const path = [file.path, ...(file.history ?? [])].find(Boolean) ?? "";
    const normalizedPath = path.replaceAll("\\", "/");
    const match =
        normalizedPath.match(/\/src\/content\/blog\/(uz|en|ru)\//) ??
        normalizedPath.match(/(?:^|\/)(uz|en|ru)\//);

    return match?.[1] ?? "uz";
}

export function remarkReadingTime() {
    return function (tree, file) {
        const locale = getLocaleFromFile(file);
        const textOnPage = toString(tree);
        const readingTime = getReadingTime(textOnPage, {
            wordsPerMinute: wordsPerMinuteByLocale[locale] ?? 200,
        });

        const data = file.data ?? (file.data = {});
        const astroData = data.astro ?? (data.astro = {});
        const frontmatter = astroData.frontmatter ?? (astroData.frontmatter = {});

        frontmatter.minutesRead = Math.max(1, Math.ceil(readingTime.minutes));
    };
}
