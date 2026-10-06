import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
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
      <h2 style={{ fontSize: '2rem', marginBottom: 20 }}>{heading}</h2>
      <ul className="plain">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/** Body of a service page: intro, what we do / what you receive, common questions and CTA. */
export function ServiceDetail({ serviceKey, locale }: ServiceDetailProps) {
  const t = useTranslations('services');
  const base = `items.${serviceKey}`;
  const faqs = t.raw(`${base}.commonQuestions`) as Faq[];

  return (
    <>
      <Section>
        <div className="narrow">
          <LicenceNotice />
          <p style={{ fontSize: '1.15rem' }}>{t(`${base}.intro`)}</p>
        </div>
      </Section>

      <Section className="band" wrapClassName="two">
        <BulletColumn heading={t('labels.whatWeDo')} items={t.raw(`${base}.whatWeDo`) as string[]} />
        <BulletColumn heading={t('labels.whatYouReceive')} items={t.raw(`${base}.whatYouReceive`) as string[]} />
      </Section>

      <Section>
        <div className="narrow">
          <h2>{t('labels.commonQuestions')}</h2>
          <ul className="plain" style={{ marginTop: 32 }}>
            {faqs.map((faq) => (
              <li key={faq.question}>
                <strong>{faq.question}</strong>
                {faq.answer}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 40 }}>
            <Button href={`/${locale}#contact`}>{t(`${base}.cta`)}</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
