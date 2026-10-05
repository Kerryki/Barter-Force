import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { LegalPage } from '@/components/pages/LegalPage';
import { pageMetadata } from '@/lib/metadata';
import type { LocaleProps } from '@/lib/page-props';

export async function generateMetadata({ params }: LocaleProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata('privacy', locale, '/privacy');
}

export default async function PrivacyPage({ params }: LocaleProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage namespace="privacy" />;
}
