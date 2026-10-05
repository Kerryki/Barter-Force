import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { PageTemplate } from '@/components/pages/PageTemplate';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { pageMetadata } from '@/lib/metadata';
import type { LocaleProps } from '@/lib/page-props';

export async function generateMetadata({ params }: LocaleProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata('fees', locale, '/fees');
}

function TextBlock({ heading, body }: { heading: string; body: string }) {
  return (
    <div>
      <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">{heading}</h2>
      <p className="font-sans text-gray-700 leading-relaxed">{body}</p>
    </div>
  );
}

export default async function Fees({ params }: LocaleProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('fees');
  const services = t.raw('services') as Array<{ name: string; cost: string }>;

  return (
    <PageTemplate title={t('title')} description={t('description')}>
      <Section className="bg-warm-white">
        <div className="max-w-3xl mx-auto space-y-12">
          <p className="text-lg font-sans text-charcoal font-medium">{t('firstMeeting')}</p>
          <TextBlock heading={t('howPaidHeading')} body={t('howPaid')} />

          <div>
            <h2 className="text-3xl font-serif font-bold text-charcoal mb-6">
              {t('servicesHeading')}
            </h2>
            <dl className="divide-y divide-gold/30 border-y border-gold/30">
              {services.map((service) => (
                <div key={service.name} className="py-4 md:grid md:grid-cols-3 md:gap-6">
                  <dt className="font-serif font-bold text-lg text-charcoal">{service.name}</dt>
                  <dd className="font-sans text-gray-700 md:col-span-2">{service.cost}</dd>
                </div>
              ))}
            </dl>
          </div>

          <TextBlock heading={t('conflictsHeading')} body={t('conflicts')} />
          <Button variant="primary" href={`/${locale}/contact`}>
            {t('cta')}
          </Button>
        </div>
      </Section>
    </PageTemplate>
  );
}
