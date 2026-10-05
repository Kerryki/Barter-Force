import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { PageTemplate } from '@/components/pages/PageTemplate';
import { Section } from '@/components/layout/Section';
import { FAQAccordion } from '@/components/faq/FAQAccordion';
import { generateFAQPage } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/metadata';
import type { LocaleProps } from '@/lib/page-props';

export async function generateMetadata({ params }: LocaleProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata('faq', locale, '/faq');
}

export default async function FAQ({ params }: LocaleProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('faq');
  const items = t.raw('items') as Array<{ question: string; answer: string }>;

  return (
    <PageTemplate title={t('title')} showDivider={false}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQPage(items)).replace(/</g, '\\u003c'),
        }}
      />
      <Section className="bg-warm-white">
        <FAQAccordion />
      </Section>
    </PageTemplate>
  );
}
