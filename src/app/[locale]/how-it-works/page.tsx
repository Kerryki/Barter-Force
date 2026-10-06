import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { PageTemplate } from '@/components/pages/PageTemplate';
import { pageMetadata } from '@/lib/metadata';
import type { LocaleProps } from '@/lib/page-props';

export async function generateMetadata({ params }: LocaleProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata('how-it-works', locale, '/how-it-works');
}

export default async function HowItWorks({ params }: LocaleProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('howItWorks');
  const steps = t.raw('steps') as Array<{ title: string; whatHappens: string; whatYouDo: string }>;

  return (
    <PageTemplate title={t('title')}>
      <Section>
        <div className="steps four" style={{ marginTop: 0 }}>
          {steps.map((step, idx) => (
            <div key={step.title} className="step">
              <span className="n">{idx + 1}</span>
              <h3>{step.title}</h3>
              <span className="label">{t('stepLabels.whatHappens')}</span>
              <p>{step.whatHappens}</p>
              <span className="label">{t('stepLabels.whatYouDo')}</span>
              <p>{step.whatYouDo}</p>
            </div>
          ))}
        </div>
      </Section>
    </PageTemplate>
  );
}
