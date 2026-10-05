import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PageTemplate } from '@/components/pages/PageTemplate';
import { ServiceDetail } from '@/components/services/ServiceDetail';
import { SERVICE_SLUGS, getServiceKey, type ServiceSlug } from '@/content/services';
import { locales } from '@/i18n.config';
import { pageMetadata } from '@/lib/metadata';
import type { SlugProps } from '@/lib/page-props';

export function generateStaticParams() {
  return locales.flatMap((locale) => SERVICE_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: SlugProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!getServiceKey(slug)) return {};
  return pageMetadata(slug as ServiceSlug, locale, `/services/${slug}`);
}

export default async function ServicePage({ params }: SlugProps) {
  const { locale, slug } = await params;
  const key = getServiceKey(slug);
  if (!key) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'services' });

  return (
    <PageTemplate title={t(`items.${key}.headline`)} description={t(`items.${key}.whoFor`)}>
      <ServiceDetail serviceKey={key} locale={locale} />
    </PageTemplate>
  );
}
