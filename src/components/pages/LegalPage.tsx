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
      <Section className="bg-warm-white">
        <div className="max-w-3xl mx-auto">
          <p
            role="note"
            className="mb-6 border-l-4 border-gold bg-gold/10 p-4 text-sm font-sans text-charcoal"
          >
            {t('draftNotice')}
          </p>
          <p className="text-sm text-gray-600 font-sans mb-10">{t('lastUpdated')}</p>
          <div className="space-y-10">
            {sections.map((section, idx) => (
              <section key={idx}>
                <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">
                  {idx + 1}. {section.heading}
                </h2>
                <div className="space-y-3 font-sans text-gray-700 leading-relaxed">
                  {section.paragraphs.map((p, pidx) => (
                    <p key={pidx}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Section>
    </PageTemplate>
  );
}
