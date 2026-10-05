import { describe, expect, it } from 'vitest';
import { seo } from './seo';
import { SERVICES, SERVICE_SLUGS, getServiceKey } from './services';
import { getArticle } from '@/lib/mdx';

describe('services', () => {
  it('maps every slug to its message key and rejects unknown slugs', () => {
    expect(getServiceKey('savings-investing')).toBe('savingsInvesting');
    expect(getServiceKey('business-barter')).toBeUndefined();
    expect(SERVICE_SLUGS).toHaveLength(SERVICES.length);
  });

  it('has an SEO entry for every service slug', () => {
    for (const slug of SERVICE_SLUGS) expect(seo).toHaveProperty([slug]);
  });
});

describe('seo table', () => {
  it('keeps every title and description within search-result lengths', () => {
    for (const [key, locales] of Object.entries(seo)) {
      for (const [locale, entry] of Object.entries(locales)) {
        expect(entry.title.length, `${key}/${locale} title`).toBeLessThanOrEqual(55);
        expect(entry.description.length, `${key}/${locale} description`).toBeLessThanOrEqual(160);
      }
    }
  });
});

describe('getArticle', () => {
  it('rejects slugs and locales that could escape the articles directory', async () => {
    expect(await getArticle('../../package', 'en')).toBeNull();
    expect(await getArticle('term-vs-amortization', '../x')).toBeNull();
    expect(await getArticle('a/b', 'en')).toBeNull();
  });
});
