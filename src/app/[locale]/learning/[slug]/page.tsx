import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Markdown from 'markdown-to-jsx';
import { Section } from '@/components/layout/Section';
import { PageTemplate } from '@/components/pages/PageTemplate';
import { getArticle, getArticlesMetadata } from '@/lib/mdx';
import { locales } from '@/i18n.config';
import { pageMetadataFromArticle } from '@/lib/metadata';
import type { SlugProps } from '@/lib/page-props';

export async function generateStaticParams() {
  const perLocale = await Promise.all(
    locales.map(async (locale) => {
      const articles = await getArticlesMetadata(locale);
      return articles.map(({ slug }) => ({ locale, slug }));
    })
  );
  return perLocale.flat();
}

export async function generateMetadata({ params }: SlugProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticle(slug, locale);
  if (!article) return {};
  return pageMetadataFromArticle(article.frontmatter, locale, `/learning/${slug}`);
}

export default async function BlogArticle({ params }: SlugProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('learning');

  const article = await getArticle(slug, locale);
  if (!article) notFound();

  const { frontmatter, content } = article;
  const date = new Date(frontmatter.date).toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-CA');

  return (
    <PageTemplate title={frontmatter.title} description={date}>
      <Section>
        <article className="prose">
          <Markdown>{content}</Markdown>
        </article>
        <p style={{ marginTop: 48 }}>
          <Link href={`/${locale}/learning`} style={{ color: 'var(--gold)' }}>
            ← {t('backToLearning')}
          </Link>
        </p>
      </Section>
    </PageTemplate>
  );
}
