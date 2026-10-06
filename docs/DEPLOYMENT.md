# Deployment

Hosting: Vercel (see `vercel.json`). Production deploys from `main`.

## What blocks a production deploy

`vercel.json` runs `npm run build:production`, which runs `scripts/content-check.mjs` first when `VERCEL_ENV=production`. The build fails while any of these remain:

1. A `[TODO: ...]` string in `src/messages/*.json`, `src/content/*.ts` or an article.
2. EN and FR message keys that do not match.
3. A `null` value in `src/content/broker.ts` (name, licences, contact, privacy officer).
4. A published article that is missing its EN or FR version, or is under 800 words.

Run `npm run content-check` locally to see the full list.

## Before launch

- [ ] Fill `src/content/broker.ts` with confirmed facts (licence numbers and regulators per service).
- [ ] Remove any service the broker is not licensed for (`src/messages`, `src/content/services.ts`, `src/content/seo.ts`).
- [ ] Replace every `[TODO]` in EN and FR, including compensation wording on `/fees` and the FAQ.
- [ ] Have a lawyer review the privacy policy (Law 25: named privacy officer, retention, providers, cross-border transfers) and terms.
- [ ] Have a native French speaker review all French copy.
- [ ] Check SEO titles and descriptions against the blueprint's Section 8 keyword table.
- [ ] Have a licensed professional review each article, then set `published: true` in both its `.mdx` and `.fr.mdx`.
- [ ] Set environment variables (see README). In production, `RESEND_API_KEY`, `RESEND_FROM_EMAIL` and `RESEND_TO_EMAIL` are required, otherwise the contact form returns 503.
- [ ] Create an Upstash Redis database and set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` so the contact rate limit is shared across instances.
- [ ] Verify the Resend sending domain (SPF, DKIM).
- [ ] Add the custom domain and confirm HTTPS.
- [ ] Submit `/sitemap.xml` to Google Search Console.

## Post-deploy smoke test

- `/` redirects to `/fr`; `/en` works; the language switch keeps the page.
- Each service page, `/fees`, `/privacy`, `/terms`, `/faq` render in both languages.
- Submit the contact form once and confirm the email arrives with phone and topic.
- Reject the cookie banner and confirm no Google Analytics request is made.
