import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { PageTemplate } from '@/components/pages/PageTemplate';
import { Section } from '@/components/layout/Section';
import { ContactForm } from '@/components/contact/ContactForm';
import { CalendarEmbed } from '@/components/contact/CalendarEmbed';
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
      <Section className="bg-warm-white">
        <div className="max-w-2xl mx-auto">
          <ContactForm />
          <CalendarEmbed url={process.env.NEXT_PUBLIC_CALENDAR_URL} title={t('calendarTitle')} />
        </div>
      </Section>
    </PageTemplate>
  );
}
