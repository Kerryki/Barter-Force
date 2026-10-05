import { MetadataRoute } from 'next';
import { SERVICE_SLUGS } from '@/content/services';
import { getArticlesMetadata } from '@/lib/mdx';

const baseUrl = 'https://barterforce.com';
const locales = ['en', 'fr'] as const;

const staticRoutes = [
  '',
  '/services',
  ...SERVICE_SLUGS.map((slug) => `/services/${slug}`),
  '/how-it-works',
  '/about',
  '/fees',
  '/faq',
  '/learning',
  '/contact',
  '/privacy',
  '/terms',
];

const LEGAL_ROUTES = new Set(['/privacy', '/terms']);

function priorityFor(route: string): number {
  if (route === '') return 1;
  if (route === '/services' || route.startsWith('/services/') || route === '/contact') return 0.9;
  if (LEGAL_ROUTES.has(route)) return 0.3;
  return 0.7;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const locale of locales) {
    const articles = await getArticlesMetadata(locale);

    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: now,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: priorityFor(route),
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${route}`])
          ),
        },
      });
    }

    for (const article of articles) {
      entries.push({
        url: `${baseUrl}/${locale}/learning/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: 'yearly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
