# Barter Force

Private financial brokerage website for Emile, Montréal, Québec: mortgages, savings and investing, credit health and protection planning, explained in plain language. Bilingual (French default, English), built to the client's "Barter Force Website Blueprint".

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · next-intl 4 (EN/FR) · Tailwind CSS 3 · react-hook-form + Zod · Resend (contact email) · vitest.

Brand: charcoal `#2C2C2C`, gold `#D4A574`, warm-white `#F5F1E8`, Cormorant Garamond + Manrope. Use `text-gold-dark` (not `text-gold`) for gold text on light backgrounds so it meets contrast requirements.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in values
npm run dev                        # http://localhost:3000 (redirects to /fr)
```

| Script | Purpose |
|---|---|
| `npm run dev` / `build` / `start` | Next.js development, production build, production server |
| `npm test` | vitest: contact schema, contact API helpers, rate limiting, content checks |
| `npm run content-check` | Launch gate (see below) |
| `npm run build:production` | Content check, then `next build`. Used by Vercel |

## Where things live

- `src/content/broker.ts`: broker facts (name, licences, contact). All `null` until confirmed.
- `src/content/seo.ts`: per-page title and description, EN and FR.
- `src/content/services.ts`: the four service slugs and their message keys.
- `src/content/glossary.ts`: 13 bilingual finance terms.
- `src/messages/{en,fr}.json`: all page copy. Keys must match exactly.
- `src/blog/articles/`: Learning Centre articles (`slug.mdx` and `slug.fr.mdx`).
- `src/app/[locale]/`: pages. `src/app/api/contact/`: contact form endpoint.

## Content rules

Regulated or unconfirmed content (compensation wording, licence numbers, lender counts, testimonials, broker bio and photo) is a visible `[TODO: ...]` string, or `null` in `broker.ts`. Never invent compensation, licensing or financial-advice claims.

## Launch gate

`npm run content-check` fails while any `[TODO]` remains, EN/FR keys differ, `broker.ts` has unconfirmed values, or a published article is incomplete (missing language, under 800 words). Unpublished articles only warn.

On Vercel, `build:production` enforces the check when `VERCEL_ENV=production`, so production deploys are blocked until the content is real. Previews and local builds print a report only. CI (`.github/workflows/ci.yml`) runs type-check, tests and build, plus the launch gate.

Articles start with `published: false` and stay hidden in production until a licensed reviewer flips the flag in both language files. Set `SHOW_DRAFT_ARTICLES=true` to preview drafts in a production build.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Production | Resend API key for the contact form |
| `RESEND_FROM_EMAIL` | Production | Verified sender address |
| `RESEND_TO_EMAIL` | Production | Broker inbox that receives requests |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Recommended | Shared rate limit across serverless instances. Without them the limit is per instance |
| `NEXT_PUBLIC_CALENDAR_URL` | No | Calendly or Cal.com link to embed |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics, loaded only after the visitor accepts cookies |
| `NEXT_PUBLIC_BUSINESS_PHONE` | No | Fallback phone for structured data until `broker.ts` has one |
| `SHOW_DRAFT_ARTICLES` | No | `true` to show unpublished articles in production |

In production the contact endpoint returns 503 if the Resend variables are missing, so mail never goes to a placeholder address.

## Security notes

- Contact endpoint: same-origin check, 20 KB body limit, Zod validation, honeypot field, rate limiting, HTML-escaped email body, single-line subject.
- Headers (in `next.config.js`): framing, plugin and base-tag restrictions, HSTS, referrer and permissions policies. A full script-src CSP needs a nonce setup and is not enabled.
- Analytics is off until the visitor accepts the cookie banner.
- `npm audit --omit=dev` reports no vulnerabilities. Remaining advisories are in the Tailwind 3 build toolchain (`braces`, `micromatch`, `chokidar`), which only processes this repo's own files at build time. They clear with a Tailwind 4 migration.

## Deployment

See `.claude/DEPLOYMENT.md`.
