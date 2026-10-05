import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Markdown from 'markdown-to-jsx';
import { Section } from '@/components/layout/Section';
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

  return (
    <>
      <Section className="bg-charcoal text-warm-white min-h-[300px] flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            {frontmatter.title}
          </h1>
          <p className="text-gold text-lg">
            {new Date(frontmatter.date).toLocaleDateString(
              locale === 'fr' ? 'fr-CA' : 'en-CA'
            )}
          </p>
        </div>
      </Section>

      <Section className="bg-warm-white">
        <div className="max-w-3xl mx-auto">
          <article className="prose prose-lg prose-charcoal max-w-none mb-12 text-charcoal">
            <Markdown>{content}</Markdown>
          </article>

          <div className="border-t border-gold/20 pt-8">
            <Link
              href={`/${locale}/learning`}
              className="text-gold-dark hover:underline font-medium transition-colors"
            >
              ← {t('backToLearning')}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
