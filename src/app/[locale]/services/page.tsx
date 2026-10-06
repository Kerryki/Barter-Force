import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { ServiceList } from '@/components/home/HomeSections';
import { Section } from '@/components/layout/Section';
import { PageTemplate } from '@/components/pages/PageTemplate';
import { LicenceNotice } from '@/components/services/LicenceNotice';
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

  return (
    <PageTemplate title={t('title')} description={t('description')}>
      <Section className="services">
        <LicenceNotice />
        <ServiceList locale={locale} />
      </Section>
    </PageTemplate>
  );
}
