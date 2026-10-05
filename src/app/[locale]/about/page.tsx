import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { PageTemplate } from '@/components/pages/PageTemplate';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { Button } from '@/components/ui/Button';
import { pageMetadata } from '@/lib/metadata';
import type { LocaleProps } from '@/lib/page-props';

export async function generateMetadata({ params }: LocaleProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata('about', locale, '/about');
}

type Translate = Awaited<ReturnType<typeof getTranslations<'about'>>>;

function BrokerSection({ t }: { t: Translate }) {
  const bio = t.raw('bio') as string[];
  return (
    <Section className="bg-warm-white">
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10 items-start">
        <div className="flex aspect-square items-center justify-center rounded-lg border border-gold bg-charcoal p-6 text-center text-sm text-warm-white">
          {t('photoPlaceholder')}
        </div>
        <div className="md:col-span-2">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-2">
            {t('brokerHeading')}
          </h2>
          <p className="text-gold-dark font-serif text-xl mb-6">{t('brokerName')}</p>
          <div className="space-y-4 text-lg text-gray-700 font-sans leading-relaxed">
            {bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function ApproachSection({ t }: { t: Translate }) {
  const approach = t.raw('approach') as Array<{ title: string; description: string }>;
  return (
    <Section className="bg-charcoal text-warm-white">
      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">
        {t('approachHeading')}
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {approach.map((item) => (
          <Card key={item.title} className="bg-charcoal border-gold">
            <h3 className="text-2xl font-serif font-bold text-gold mb-4">{item.title}</h3>
            <p className="text-gray-300 font-sans">{item.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function DetailsSection({ t, locale }: { t: Translate; locale: string }) {
  return (
    <Section className="bg-warm-white">
      <div className="max-w-3xl mx-auto space-y-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-charcoal mb-3">
            {t('credentialsHeading')}
          </h2>
          <p className="font-sans text-gray-700">{t('credentials')}</p>
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-charcoal mb-3">
            {t('languagesHeading')}
          </h2>
          <p className="font-sans text-gray-700">{t('languages')}</p>
        </div>
        <Button variant="primary" href={`/${locale}/contact`}>
          {t('cta')}
        </Button>
      </div>
    </Section>
  );
}

export default async function About({ params }: LocaleProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <PageTemplate title={t('title')} description={t('description')}>
      <BrokerSection t={t} />
      <GoldDivider />
      <ApproachSection t={t} />
      <GoldDivider />
      <DetailsSection t={t} locale={locale} />
    </PageTemplate>
  );
}
