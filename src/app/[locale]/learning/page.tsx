import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { PageTemplate } from '@/components/pages/PageTemplate';
import { Section } from '@/components/layout/Section';
import { GlossaryWidget } from '@/components/home/GlossaryWidget';
import { getArticlesMetadata, type ArticleMetadata } from '@/lib/mdx';
import { pageMetadata } from '@/lib/metadata';
import type { LocaleProps } from '@/lib/page-props';

export async function generateMetadata({ params }: LocaleProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata('learning', locale, '/learning');
}

type Translate = Awaited<ReturnType<typeof getTranslations<'learning'>>>;

function ArticleCard({ article, locale, t }: { article: ArticleMetadata; locale: string; t: Translate }) {
  const dateLocale = locale === 'fr' ? 'fr-CA' : 'en-CA';
  return (
    <article className="bg-charcoal border border-gold/30 rounded-lg p-6 hover:border-gold/60 transition-colors">
      <h3 className="text-2xl font-serif font-bold mb-2">{article.title}</h3>
      <p className="text-gold text-sm mb-4">
        {new Date(article.date).toLocaleDateString(dateLocale)}
      </p>
      <p className="text-gray-300 mb-6">{article.excerpt}</p>
      <Link
        href={`/${locale}/learning/${article.slug}`}
        className="text-gold hover:text-gold/80 font-medium transition-colors"
      >
        {t('readMore')} →
      </Link>
    </article>
  );
}

function ArticlesSection({ locale, t, articles }: { locale: string; t: Translate; articles: ArticleMetadata[] }) {
  return (
    <Section className="bg-charcoal text-warm-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-serif font-bold mb-4 text-center">{t('articlesTitle')}</h2>
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          {t('articlesDescription')}
        </p>
        {articles.length === 0 ? (
          <p className="text-center text-gray-300">{t('noArticles')}</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} locale={locale} t={t} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

export default async function Learning({ params }: LocaleProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const articles = await getArticlesMetadata(locale);
  const t = await getTranslations('learning');

  return (
    <PageTemplate title={t('title')} description={t('description')}>
      <Section className="bg-warm-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-charcoal mb-4 text-center">
            {t('glossaryTitle')}
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            {t('glossaryDescription')}
          </p>
          <GlossaryWidget />
        </div>
      </Section>
      <ArticlesSection locale={locale} t={t} articles={articles} />
    </PageTemplate>
  );
}
