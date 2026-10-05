import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { PageTemplate } from '@/components/pages/PageTemplate';
import { Section } from '@/components/layout/Section';
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
      <Section className="bg-warm-white">
        <ol className="max-w-3xl mx-auto space-y-12">
          {steps.map((step, idx) => (
            <li key={step.title} className="flex gap-6">
              <div className="bg-gold text-charcoal rounded-full w-14 h-14 shrink-0 flex items-center justify-center font-serif font-bold text-2xl">
                {idx + 1}
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">{step.title}</h2>
                <p className="font-sans text-gray-700 leading-relaxed mb-3">
                  <span className="font-bold text-charcoal">{t('stepLabels.whatHappens')}: </span>
                  {step.whatHappens}
                </p>
                <p className="font-sans text-gray-700 leading-relaxed">
                  <span className="font-bold text-charcoal">{t('stepLabels.whatYouDo')}: </span>
                  {step.whatYouDo}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </PageTemplate>
  );
}
