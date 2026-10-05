import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { PageTemplate } from '@/components/pages/PageTemplate';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { LicenceNotice } from '@/components/services/LicenceNotice';
import { SERVICES } from '@/content/services';
import { pageMetadata } from '@/lib/metadata';
import type { LocaleProps } from '@/lib/page-props';

export async function generateMetadata({ params }: LocaleProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata('services', locale, '/services');
}

export default async function Services({ params }: LocaleProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('services');
  const cards = t.raw('cards') as Array<{ title: string; description: string }>;

  return (
    <PageTemplate title={t('title')} description={t('description')}>
      <Section className="bg-warm-white">
        <LicenceNotice />
        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((card, idx) => (
            <Link key={card.title} href={`/${locale}/services/${SERVICES[idx].slug}`}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">{card.title}</h3>
                <p className="text-gray-700 font-sans mb-6">{card.description}</p>
                <div className="text-gold-dark font-medium">{t('learnMore')}</div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </PageTemplate>
  );
}
