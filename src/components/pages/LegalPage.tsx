import { useTranslations } from 'next-intl';
import { PageTemplate } from '@/components/pages/PageTemplate';
import { Section } from '@/components/layout/Section';

interface LegalPageProps {
  namespace: 'privacy' | 'terms';
}

export function LegalPage({ namespace }: LegalPageProps) {
  const t = useTranslations(namespace);
  const sections = t.raw('sections') as Array<{ heading: string; paragraphs: string[] }>;

  return (
    <PageTemplate title={t('title')} description={t('description')}>
      <Section>
        <div className="legal narrow">
          <p role="note" className="notice">
            {t('draftNotice')}
          </p>
          <p className="fine" style={{ marginTop: 0 }}>{t('lastUpdated')}</p>
          {sections.map((section, idx) => (
            <section key={section.heading} style={{ padding: 0 }}>
              <h2>
                {idx + 1}. {section.heading}
              </h2>
              {section.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </Section>
    </PageTemplate>
  );
}
