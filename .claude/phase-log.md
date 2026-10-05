# Phase log: pivot to financial-broker site

Original build (Oct 2): six phases producing a peer-to-peer skill-bartering marketplace under the same name. The client's blueprint calls for a financial broker site, so the content and pages were pivoted. Stack, palette and fonts were unchanged.

## Pivot phases

1. **Content foundation and core pages.** `broker.ts`, 13-term finance glossary, new header nav, EN and FR messages, home page (blueprint 5.1), single `services/[slug]` page for four services, how-it-works, learning route refactored onto `lib/mdx.ts`, barter articles removed.
2. **Contact form.** Phone, topic dropdown, consent linked to `/privacy`, first-name confirmation, Zod schema with tests.
3. **Compliance.** Privacy policy (Law 25), terms, about, fees and transparency, footer with licence line and disclaimer, honest cookie notice, `FinancialService` JSON-LD.
4. **SEO.** Central `seo.ts` (EN+FR), canonical and hreflang, dynamic sitemap.
5. **Articles.** Ten EN+FR articles, all `published: false` pending professional review.
6. **Launch gate.** `content-check` script, CI workflow, production build gating, lockfile fix.
7. **Review and hardening.** Next.js 15 / React 19 / next-intl 4 upgrade (clears Next.js critical advisories), contact API hardening (origin check, size limit, honeypot, shared rate limit), slug validation, accessibility (form wiring, gold-dark text colour), component splitting, docs rewrite, security headers.

## Known open items

See `.claude/DEPLOYMENT.md` ("Before launch"). Tailwind 3 build-toolchain advisories remain until a Tailwind 4 migration.
