import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { PageTemplate } from '@/components/pages/PageTemplate';
import { Button } from '@/components/ui/Button';
import { pageMetadata } from '@/lib/metadata';
import type { LocaleProps } from '@/lib/page-props';

export async function generateMetadata({ params }: LocaleProps): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata('about', locale, '/about');
}

type Translate = Awaited<ReturnType<typeof getTranslations<'about'>>>;

function BrokerSection({ t }: { t: Translate }) {
  const bio = t.raw('bio') as string[];
  return (
    <Section wrapClassName="two">
      <div className="card" style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <p className="sub" style={{ margin: 0 }}>{t('photoPlaceholder')}</p>
      </div>
      <div>
        <h2>{t('brokerHeading')}</h2>
        <p style={{ color: 'var(--gold)', fontFamily: 'var(--serif)', fontSize: '1.5rem', margin: '16px 0 24px' }}>
          {t('brokerName')}
        </p>
        {bio.map((p) => (
          <p key={p} className="sub">{p}</p>
        ))}
      </div>
    </Section>
  );
}

function ApproachSection({ t }: { t: Translate }) {
  const approach = t.raw('approach') as Array<{ title: string; description: string }>;
  return (
    <Section className="band">
      <h2>{t('approachHeading')}</h2>
      <div className="steps">
        {approach.map((item, idx) => (
          <div key={item.title} className="step">
            <span className="n">{idx + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default async function About({ params }: LocaleProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <PageTemplate title={t('title')} description={t('description')}>
      <BrokerSection t={t} />
      <ApproachSection t={t} />
      <Section>
        <div className="narrow">
          <ul className="plain">
            <li>
              <strong>{t('credentialsHeading')}</strong>
              {t('credentials')}
            </li>
            <li>
              <strong>{t('languagesHeading')}</strong>
              {t('languages')}
            </li>
          </ul>
          <div style={{ marginTop: 32 }}>
            <Button href={`/${locale}#contact`}>{t('cta')}</Button>
          </div>
        </div>
      </Section>
    </PageTemplate>
  );
}
