import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { ContactSection } from '@/components/contact/ContactSection';
import { PageTemplate } from '@/components/pages/PageTemplate';
import { pageMetadata } from '@/lib/metadata';
import type { LocaleProps } from '@/lib/page-props';

export async function generateMetadata({ params }: LocaleProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata('contact', locale, '/contact');
}

export default async function Contact({ params }: LocaleProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <PageTemplate title={t('title')} description={t('description')}>
      <ContactSection showHeading={false} formOpen />
    </PageTemplate>
  );
}
