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

function ArticleList({ locale, t, articles }: { locale: string; t: Translate; articles: ArticleMetadata[] }) {
  const dateLocale = locale === 'fr' ? 'fr-CA' : 'en-CA';
  if (articles.length === 0) return <p className="sub">{t('noArticles')}</p>;
  return (
    <div className="list">
      {articles.map((article) => (
        <Link key={article.slug} className="svc" href={`/${locale}/learning/${article.slug}`}>
          <h3>{article.title}</h3>
          <p>{article.excerpt}</p>
          <span className="for">{new Date(article.date).toLocaleDateString(dateLocale)}</span>
        </Link>
      ))}
    </div>
  );
}

export default async function Learning({ params }: LocaleProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const articles = await getArticlesMetadata(locale);
  const t = await getTranslations('learning');

  return (
    <PageTemplate title={t('title')} description={t('description')}>
      <Section>
        <h2>{t('glossaryTitle')}</h2>
        <p className="sub" style={{ margin: '24px 0 36px' }}>{t('glossaryDescription')}</p>
        <GlossaryWidget tone="light" showHeading={false} />
      </Section>
      <Section className="services">
        <h2>{t('articlesTitle')}</h2>
        <p className="sub" style={{ marginTop: 24 }}>{t('articlesDescription')}</p>
        <ArticleList locale={locale} t={t} articles={articles} />
      </Section>
    </PageTemplate>
  );
}
