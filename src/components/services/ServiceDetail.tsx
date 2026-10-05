import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { Button } from '@/components/ui/Button';
import { LicenceNotice } from '@/components/services/LicenceNotice';

interface ServiceDetailProps {
  serviceKey: string;
  locale: string;
}

interface Faq {
  question: string;
  answer: string;
}

function BulletColumn({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div>
      <h2 className="text-3xl font-serif font-bold mb-6">{heading}</h2>
      <ul className="space-y-3 font-sans list-disc pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function FaqSection({ faqs, label, cta, locale }: { faqs: Faq[]; label: string; cta: string; locale: string }) {
  return (
    <Section className="bg-warm-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-charcoal mb-8">{label}</h2>
        <dl className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="font-serif font-bold text-xl text-charcoal mb-2">{faq.question}</dt>
              <dd className="font-sans text-gray-700">{faq.answer}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-12">
          <Button variant="primary" href={`/${locale}/contact`}>
            {cta}
          </Button>
        </div>
      </div>
    </Section>
  );
}

/** Body of a service page: intro, what we do / what you receive, common questions and CTA. */
export function ServiceDetail({ serviceKey, locale }: ServiceDetailProps) {
  const t = useTranslations('services');
  const base = `items.${serviceKey}`;
  const faqs = t.raw(`${base}.commonQuestions`) as Faq[];

  return (
    <>
      <Section className="bg-warm-white">
        <div className="max-w-3xl mx-auto">
          <LicenceNotice />
          <p className="text-lg font-sans text-gray-700 leading-relaxed">{t(`${base}.intro`)}</p>
        </div>
      </Section>

      <GoldDivider />

      <Section className="bg-charcoal text-warm-white">
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-12">
          <BulletColumn heading={t('labels.whatWeDo')} items={t.raw(`${base}.whatWeDo`) as string[]} />
          <BulletColumn
            heading={t('labels.whatYouReceive')}
            items={t.raw(`${base}.whatYouReceive`) as string[]}
          />
        </div>
      </Section>

      <GoldDivider />

      <FaqSection faqs={faqs} label={t('labels.commonQuestions')} cta={t(`${base}.cta`)} locale={locale} />
    </>
  );
}
