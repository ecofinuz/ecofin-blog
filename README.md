# Ecofin Blog

Ecofin is a multilingual economics and finance blog focused on financial literacy. The site is built around article series, starting with the Uzbek `kredit` series about loans, interest, inflation, rates, and credit scoring.

The production site is configured for `https://blog.ecofin.uz`.

## Stack

- Astro 6
- MDX content collections
- Static routes
- `@astrojs/rss` for language-specific RSS feeds
- `@astrojs/sitemap` for sitemap generation
- Chart.js for interactive financial explainers

## Locales

The default locale is Uzbek and is not URL-prefixed:

- Uzbek: `/`, `/kredit/`, `/kredit/sodda-va-murakkab-foizlar/`
- English: `/en/`, `/en/loan/`, `/en/loan/simple-and-compound-interest/`
- Russian: `/ru/`, `/ru/kredit/`, `/ru/kredit/prostie-i-slojnie-protsenti/`

Locale and category labels are defined in `src/data/categories.ts`.

## Content

Posts live under:

```text
src/content/blog/{locale}/{category-slug}/{post-slug}.mdx
```

Each post must include frontmatter matching the content schema in `src/content.config.ts`:

```yaml
---
title: Post title
description: Short summary
date: 2026-04-11
category: kredit
translationKey: shared-translation-key
author: hojiakbar
series:
    part: 1
---
```

Use the locale-specific category slug in `category`. For example, English loan posts use `category: loan`, while Uzbek and Russian loan posts currently use `category: kredit`.

## Commands

All commands run from the project root:

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local dev server |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro -- --help` | Show Astro CLI help |

Node.js `>=22.12.0` is required.

## Key Files

- `astro.config.mjs` - site config, i18n, sitemap, MDX integration
- `src/content.config.ts` - MDX collection schema
- `src/data/categories.ts` - canonical category keys, localized slugs, labels
- `src/data/authors.ts` - author metadata
- `src/layouts/Layout.astro` - shared page shell, SEO metadata, navigation, footer
- `src/components/InterestChart.astro` - simple vs compound interest chart
- `src/components/NominalRateCalculator.astro` - nominal rate calculator
