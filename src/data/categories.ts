export type CategoryKey =
    | "kredit"
    | "birja"
    | "tilla"
    | "treyding"
    | "pul-saqlash"
    | "inqirozlar"
    | "boshqalar";

export type Locale = "uz" | "en" | "ru";

export const categories: Record<
    CategoryKey,
    Record<Locale, { slug: string; label: string }>
> = {
    kredit: {
        uz: { slug: "kredit", label: "Kredit" },
        en: { slug: "loan", label: "Loan" },
        ru: { slug: "kredit", label: "Кредит" },
    },
    birja: {
        uz: { slug: "birja", label: "Birja" },
        en: { slug: "stock", label: "Stock Market" },
        ru: { slug: "birzha", label: "Биржа" },
    },
    tilla: {
        uz: { slug: "tilla", label: "Tilla" },
        en: { slug: "gold", label: "Gold" },
        ru: { slug: "zoloto", label: "Золото" },
    },
    treyding: {
        uz: { slug: "treyding", label: "Treyding" },
        en: { slug: "trading", label: "Trading" },
        ru: { slug: "treyding", label: "Трейдинг" },
    },
    "pul-saqlash": {
        uz: { slug: "pul-saqlash", label: "Pul saqlash" },
        en: { slug: "savings", label: "Savings" },
        ru: { slug: "sberezheniya", label: "Сбережения" },
    },
    inqirozlar: {
        uz: { slug: "inqirozlar", label: "Inqirozlar" },
        en: { slug: "crises", label: "Crises" },
        ru: { slug: "krizisy", label: "Кризисы" },
    },
    boshqalar: {
        uz: { slug: "boshqalar", label: "Boshqalar" },
        en: { slug: "other", label: "Other" },
        ru: { slug: "drugoe", label: "Другое" },
    },
};

// Reverse lookup: given a URL slug + locale, find the CategoryKey
export function getCategoryKeyFromSlug(
    slug: string,
    locale: Locale,
): CategoryKey | undefined {
    return (Object.keys(categories) as CategoryKey[]).find(
        (key) => categories[key][locale].slug === slug,
    );
}
