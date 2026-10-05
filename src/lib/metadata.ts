import { Metadata } from 'next';
import { getSeo, type SeoKey } from '@/content/seo';

export interface MetadataParams {
  title?: string;
  description?: string;
  path?: string;
  locale?: string;
}

/**
 * Generate standard metadata for a page with language alternates
 */
export function generateMetadata(params: MetadataParams): Metadata {
  const {
    title = 'Barter Force',
    description = 'Private financial brokerage in Montréal: mortgages, savings and investing, credit health and protection.',
    path = '',
    locale = 'en',
  } = params;

  const url = `https://barterforce.com${path}`;

  // Generate alternates for both English and French versions
  const alternates: any = {
    canonical: path || `/${locale}`,
    languages: {
      en: path.replace(/^\/fr/, '/en'),
      fr: path.replace(/^\/en/, '/fr') || '/fr',
      'x-default': path.replace(/^\/en/, '/fr') || '/fr',
    },
  };

  return {
    title: `${title} | Barter Force`,
    description,
    keywords: ['mortgage broker', 'financial broker', 'Montréal', 'savings and investing', 'credit health'],
    alternates,
    openGraph: {
      title: `${title} | Barter Force`,
      description,
      url,
      siteName: 'Barter Force',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Barter Force`,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Generate metadata for a page from the central SEO table (src/content/seo.ts)
 */
export function pageMetadata(key: SeoKey, locale: string, path: string): Metadata {
  const { title, description } = getSeo(key, locale);
  return generateMetadata({ title, description, path: `/${locale}${path}`, locale });
}

/** Generate metadata for an article page from its frontmatter */
export function pageMetadataFromArticle(
  frontmatter: { title: string; excerpt: string },
  locale: string,
  path: string
): Metadata {
  return generateMetadata({
    title: frontmatter.title,
    description: frontmatter.excerpt,
    path: `/${locale}${path}`,
    locale,
  });
}
