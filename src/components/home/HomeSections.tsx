import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { GlossaryWidget } from '@/components/home/GlossaryWidget';
import { SERVICES } from '@/content/services';

interface LocaleProp {
  locale: string;
}

const HERO_TERMS = ['equity', 'amortization', 'tfsa', 'credit-score', 'diversification'];

export function HeroSection({ locale }: LocaleProp) {
  const t = useTranslations('hero');
  return (
    <Section className="bg-charcoal text-warm-white">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">{t('headline')}</h1>
          <p className="text-xl font-sans text-gold mb-8">{t('subheadline')}</p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" href={`/${locale}/contact`}>
              {t('primaryCta')}
            </Button>
            <Button variant="secondary" href={`/${locale}/services`}>
              {t('secondaryCta')}
            </Button>
          </div>
        </div>
        <GlossaryWidget termIds={HERO_TERMS} />
      </div>
    </Section>
  );
}

export function IntroSection() {
  const t = useTranslations('intro');
  return (
    <Section className="bg-warm-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-8">
          {t('title')}
        </h2>
        <p className="text-lg font-sans text-gray-700 mb-4">{t('paragraph1')}</p>
        <p className="text-lg font-sans text-gray-700">{t('paragraph2')}</p>
      </div>
    </Section>
  );
}

export function ServicesSection({ locale }: LocaleProp) {
  const tHome = useTranslations('homeServices');
  const t = useTranslations('services');
  const cards = t.raw('cards') as Array<{ title: string; description: string }>;
  return (
    <Section className="bg-warm-white">
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-12 text-center">
        {tHome('title')}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <Link key={card.title} href={`/${locale}/services/${SERVICES[idx].slug}`}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
              <h3 className="text-xl font-serif font-bold text-charcoal mb-3">{card.title}</h3>
              <p className="text-gray-700 font-sans mb-4">{card.description}</p>
              <div className="text-gold-dark font-medium">{t('learnMore')}</div>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export function ProcessSection() {
  const t = useTranslations('processStrip');
  const steps = t.raw('steps') as Array<{ title: string; description: string }>;
  return (
    <Section className="bg-charcoal text-warm-white">
      <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-center">{t('title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, idx) => (
          <div key={step.title} className="text-center">
            <div className="bg-gold text-charcoal rounded-full w-16 h-16 flex items-center justify-center font-serif font-bold text-2xl mx-auto mb-4">
              {idx + 1}
            </div>
            <h3 className="font-serif font-bold text-lg mb-2">{step.title}</h3>
            <p className="text-sm text-gray-300 font-sans">{step.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function PromiseSection() {
  const t = useTranslations('promise');
  const items = t.raw('items') as string[];
  return (
    <Section className="bg-gold text-charcoal">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-center">{t('title')}</h2>
        <ul className="space-y-6">
          {items.map((text) => (
            <li key={text} className="flex items-start gap-4">
              <span aria-hidden="true" className="text-charcoal font-bold text-2xl mt-1">
                ✓
              </span>
              <p className="text-lg font-sans">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/** Renders nothing until real testimonials are added to messages. */
export function TestimonialsSection() {
  const t = useTranslations();
  const items = t.raw('testimonials') as Array<{ quote: string; name: string }>;
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <Section className="bg-warm-white">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {items.map((item) => (
          <blockquote key={item.name} className="border-l-4 border-gold pl-6">
            <p className="text-lg font-sans text-charcoal mb-2">“{item.quote}”</p>
            <footer className="text-gray-700 font-sans text-sm">{item.name}</footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}

export function FinalCtaSection({ locale }: LocaleProp) {
  const t = useTranslations('finalCta');
  return (
    <Section className="bg-charcoal text-warm-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">{t('title')}</h2>
        <p className="text-lg font-sans text-gray-300 mb-8">{t('description')}</p>
        <Button variant="primary" href={`/${locale}/contact`}>
          {t('button')}
        </Button>
      </div>
    </Section>
  );
}
