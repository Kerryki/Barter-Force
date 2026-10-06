import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { PageTemplate } from '@/components/pages/PageTemplate';
import { Button } from '@/components/ui/Button';
import { pageMetadata } from '@/lib/metadata';
import type { LocaleProps } from '@/lib/page-props';

export async function generateMetadata({ params }: LocaleProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata('fees', locale, '/fees');
}

function TextBlock({ heading, body }: { heading: string; body: string }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <h2 style={{ fontSize: '2.2rem', marginBottom: 16 }}>{heading}</h2>
      <p className="sub">{body}</p>
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
      <Section>
        <div className="narrow">
          <p style={{ fontSize: '1.15rem', marginBottom: 48 }}>{t('firstMeeting')}</p>
          <TextBlock heading={t('howPaidHeading')} body={t('howPaid')} />
          <h2 style={{ fontSize: '2.2rem', marginBottom: 16 }}>{t('servicesHeading')}</h2>
          <ul className="plain" style={{ marginBottom: 56 }}>
            {services.map((service) => (
              <li key={service.name}>
                <strong>{service.name}</strong>
                {service.cost}
              </li>
            ))}
          </ul>
          <TextBlock heading={t('conflictsHeading')} body={t('conflicts')} />
          <Button href={`/${locale}#contact`}>{t('cta')}</Button>
        </div>
      </Section>
    </PageTemplate>
  );
}
