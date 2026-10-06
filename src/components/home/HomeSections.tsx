import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { GlossaryWidget } from '@/components/home/GlossaryWidget';
import { SERVICES } from '@/content/services';

interface LocaleProp {
  locale: string;
}

const HERO_TERMS = ['equity', 'amortization', 'tfsa', 'credit-score', 'diversification'];

export function HeroSection({ locale }: LocaleProp) {
  const t = useTranslations('hero');
  return (
    <div className="hero">
      <div className="wrap">
        <div>
          <h1>{t('headline')}</h1>
          <p className="lead">{t('subheadline')}</p>
          <div className="cta">
            <Button href={`/${locale}#contact`}>{t('primaryCta')}</Button>
            <Button variant="ghost" href={`/${locale}#services`}>
              {t('secondaryCta')}
            </Button>
          </div>
        </div>
        <GlossaryWidget termIds={HERO_TERMS} />
      </div>
    </div>
  );
}

export function IntroSection() {
  const t = useTranslations('intro');
  return (
    <Section className="intro" wrapClassName="grid">
      <h2>{t('title')}</h2>
      <div>
        <p>{t('paragraph1')}</p>
        <p>{t('paragraph2')}</p>
      </div>
    </Section>
  );
}

/** The four services as ruled rows, each linking to its own page. */
export function ServiceList({ locale }: LocaleProp) {
  const t = useTranslations('services');
  const cards = t.raw('cards') as Array<{ title: string; description: string; tag: string }>;
  return (
    <div className="list">
      {cards.map((card, idx) => (
        <Link key={card.title} className="svc" href={`/${locale}/services/${SERVICES[idx].slug}`}>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <span className="for">{card.tag}</span>
        </Link>
      ))}
    </div>
  );
}

export function ServicesSection({ locale }: LocaleProp) {
  const t = useTranslations('homeServices');
  return (
    <Section id="services" className="services">
      <h2>{t('title')}</h2>
      <ServiceList locale={locale} />
    </Section>
  );
}

export function ProcessSection() {
  const t = useTranslations('processStrip');
  const steps = t.raw('steps') as Array<{ title: string; description: string }>;
  return (
    <Section id="process">
      <h2>{t('title')}</h2>
      <div className="steps">
        {steps.map((step, idx) => (
          <div key={step.title} className="step">
            <span className="n">{idx + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function PromiseSection() {
  const t = useTranslations('promise');
  const items = t.raw('items') as Array<{ title: string; text: string }>;
  return (
    <Section id="promise" className="promise" wrapClassName="grid">
      <h2>{t('title')}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Renders nothing until real testimonials are added to messages. */
export function TestimonialsSection() {
  const t = useTranslations();
  const items = t.raw('testimonials') as Array<{ quote: string; name: string }>;
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <Section className="band" wrapClassName="two">
      {items.map((item) => (
        <blockquote key={item.name} style={{ margin: 0 }}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem' }}>“{item.quote}”</p>
          <footer className="sub">{item.name}</footer>
        </blockquote>
      ))}
    </Section>
  );
}
