import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { AssistantSection } from '@/components/home/AssistantSection';
import { BudgetSection } from '@/components/home/BudgetSection';
import { InsuranceSection } from '@/components/home/InsuranceSection';
import { LeverageSection } from '@/components/home/LeverageSection';
import {
  HeroSection,
  IntroSection,
  ProcessSection,
  PromiseSection,
  ServicesSection,
  TestimonialsSection,
} from '@/components/home/HomeSections';
import { ContactSection } from '@/components/contact/ContactSection';
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
      <IntroSection />
      <ServicesSection locale={locale} />
      <BudgetSection />
      <LeverageSection />
      <InsuranceSection />
      <AssistantSection />
      <ProcessSection />
      <PromiseSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
