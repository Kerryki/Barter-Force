import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { GoldDivider } from '@/components/ui/GoldDivider';
import {
  FinalCtaSection,
  HeroSection,
  IntroSection,
  ProcessSection,
  PromiseSection,
  ServicesSection,
  TestimonialsSection,
} from '@/components/home/HomeSections';
import { pageMetadata } from '@/lib/metadata';
import type { LocaleProps } from '@/lib/page-props';

export async function generateMetadata({ params }: LocaleProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata('home', locale, '');
}

export default async function Home({ params }: LocaleProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection locale={locale} />
      <GoldDivider />
      <IntroSection />
      <GoldDivider />
      <ServicesSection locale={locale} />
      <GoldDivider />
      <ProcessSection />
      <GoldDivider />
      <PromiseSection />
      <TestimonialsSection />
      <GoldDivider />
      <FinalCtaSection locale={locale} />
    </>
  );
}
