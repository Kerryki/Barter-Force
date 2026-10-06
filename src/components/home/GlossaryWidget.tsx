'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { glossaryTerms } from '@/content/glossary';

interface GlossaryWidgetProps {
  termIds?: string[];
  /** `light` is for use on a light section; the hero uses the default dark style. */
  tone?: 'dark' | 'light';
  showHeading?: boolean;
}

/** "Finance, translated": tap a term to see a plain-language definition. */
export function GlossaryWidget({ termIds, tone = 'dark', showHeading = true }: GlossaryWidgetProps) {
  const locale = useLocale();
  const t = useTranslations('glossary');
  const items = termIds
    ? glossaryTerms.filter((item) => termIds.includes(item.id))
    : glossaryTerms;
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');
  const active = items.find((item) => item.id === activeId) ?? items[0];
  const french = locale === 'fr';

  return (
    <aside className={`translator${tone === 'light' ? ' on-light' : ''}`} aria-label={t('title')}>
      {showHeading && (
        <>
          <h3>{t('title')}</h3>
          <small>{t('hint')}</small>
        </>
      )}
      <div className="terms" role="group" aria-label={t('title')}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === active?.id}
            onClick={() => setActiveId(item.id)}
          >
            {french ? item.fr_term : item.term}
          </button>
        ))}
      </div>
      {active && (
        <div className="answer" aria-live="polite">
          <strong>{french ? active.fr_term : active.term}</strong>
          <p>{french ? active.fr_definition : active.definition}</p>
        </div>
      )}
    </aside>
  );
}
