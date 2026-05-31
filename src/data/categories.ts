export type CategoryKey =
    | "kredit"
    | "birja"
    | "tilla"
    | "treyding"
    | "pul-saqlash"
    | "inqirozlar"
    | "boshqalar";

export type Locale = "uz" | "en" | "ru";

export type CategoryDetails = {
    slug: string;
    label: string;
    description: string;
};

export const categories: Record<
    CategoryKey,
    Record<Locale, CategoryDetails>
> = {
    kredit: {
        uz: {
            slug: "kredit",
            label: "Kredit",
            description:
                "Kreditlar, foiz stavkalari, kredit reytingi va qarz olishdan oldin bilish kerak bo‘lgan asosiy tushunchalar.",
        },
        en: {
            slug: "loan",
            label: "Loan",
            description:
                "Guides on loans, interest rates, credit scores, and the key ideas to understand before borrowing money.",
        },
        ru: {
            slug: "kredit",
            label: "Кредит",
            description:
                "Материалы о кредитах, процентных ставках, кредитном рейтинге и ключевых вещах, которые важно понимать перед займом.",
        },
    },
    birja: {
        uz: {
            slug: "birja",
            label: "Birja",
            description:
                "Aksiyalar, bozorlar, investitsiya tushunchalari va birjada narxlar qanday shakllanishi haqida sodda tushuntirishlar.",
        },
        en: {
            slug: "stock",
            label: "Stock Market",
            description:
                "Plain-language explainers on stocks, markets, investing concepts, and how prices move.",
        },
        ru: {
            slug: "birzha",
            label: "Биржа",
            description:
                "Простые объяснения об акциях, рынках, инвестиционных понятиях и о том, как формируются цены.",
        },
    },
    tilla: {
        uz: {
            slug: "tilla",
            label: "Tilla",
            description:
                "Tilla, uning narxi, jamg‘arma sifatidagi o‘rni va iqtisodiyotdagi ahamiyati haqida maqolalar.",
        },
        en: {
            slug: "gold",
            label: "Gold",
            description:
                "Articles about gold, its price, its role as savings, and why it matters in the economy.",
        },
        ru: {
            slug: "zoloto",
            label: "Золото",
            description:
                "Материалы о золоте, его цене, роли в сбережениях и значении в экономике.",
        },
    },
    treyding: {
        uz: {
            slug: "treyding",
            label: "Treyding",
            description:
                "Treyding, risk, bozor psixologiyasi va qisqa muddatli savdo qarorlari haqida tushunarli maqolalar.",
        },
        en: {
            slug: "trading",
            label: "Trading",
            description:
                "Clear articles on trading, risk, market psychology, and short-term decision-making.",
        },
        ru: {
            slug: "treyding",
            label: "Трейдинг",
            description:
                "Понятные статьи о трейдинге, риске, рыночной психологии и краткосрочных торговых решениях.",
        },
    },
    "pul-saqlash": {
        uz: {
            slug: "pul-saqlash",
            label: "Pul saqlash",
            description:
                "Jamg‘arma, budjet, xarajatlarni boshqarish va pulni xavfsiz saqlash bo‘yicha amaliy tushuntirishlar.",
        },
        en: {
            slug: "savings",
            label: "Savings",
            description:
                "Practical explanations on saving, budgeting, managing expenses, and keeping money safely.",
        },
        ru: {
            slug: "sberezheniya",
            label: "Сбережения",
            description:
                "Практические объяснения о сбережениях, бюджете, управлении расходами и безопасном хранении денег.",
        },
    },
    inqirozlar: {
        uz: {
            slug: "inqirozlar",
            label: "Inqirozlar",
            description:
                "Iqtisodiy inqirozlar, ularning sabablari, oqibatlari va oddiy odamlar hayotiga ta’siri haqida maqolalar.",
        },
        en: {
            slug: "crises",
            label: "Crises",
            description:
                "Articles about economic crises, what causes them, how they spread, and how they affect everyday life.",
        },
        ru: {
            slug: "krizisy",
            label: "Кризисы",
            description:
                "Статьи об экономических кризисах, их причинах, последствиях и влиянии на повседневную жизнь.",
        },
    },
    boshqalar: {
        uz: {
            slug: "boshqalar",
            label: "Boshqalar",
            description:
                "Ecofin’dagi boshqa moliya va iqtisod mavzulari bo‘yicha qo‘shimcha maqolalar.",
        },
        en: {
            slug: "other",
            label: "Other",
            description:
                "Additional Ecofin articles on finance, economics, and practical money decisions.",
        },
        ru: {
            slug: "drugoe",
            label: "Другое",
            description:
                "Дополнительные материалы Ecofin о финансах, экономике и практических денежных решениях.",
        },
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

export function getCategoryDetailsFromSlug(slug: string, locale: Locale) {
    const key = getCategoryKeyFromSlug(slug, locale);

    if (!key) {
        return {
            key: undefined,
            slug,
            label: slug,
            description: "",
        };
    }

    return {
        key,
        ...categories[key][locale],
    };
}
