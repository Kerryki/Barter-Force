/** Route props for pages under `app/[locale]` (Next.js 15 passes params as a Promise). */
export interface LocaleProps {
  params: Promise<{ locale: string }>;
}

/** Route props for dynamic `[slug]` pages under `app/[locale]`. */
export interface SlugProps {
  params: Promise<{ locale: string; slug: string }>;
}
