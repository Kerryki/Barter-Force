'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { glossaryTerms } from '@/content/glossary';

interface GlossaryWidgetProps {
  termIds?: string[];
}

export function GlossaryWidget({ termIds }: GlossaryWidgetProps) {
  const locale = useLocale();
  const items = termIds
    ? glossaryTerms.filter((item) => termIds.includes(item.id))
    : glossaryTerms;
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');
  const active = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4" role="tablist">
        {items.map((item) => {
          const isActive = item.id === active?.id;
          const displayTerm = locale === 'fr' ? item.fr_term : item.term;

          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(item.id)}
              className={`px-4 py-2 rounded-full border-2 text-sm font-sans font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 ${
                isActive
                  ? 'border-gold bg-gold text-charcoal'
                  : 'border-gray-200 bg-white text-charcoal hover:border-gold'
              }`}
            >
              {displayTerm}
            </button>
          );
        })}
      </div>
      {active && (
        <div role="tabpanel" className="p-4 rounded-lg border-2 border-gold bg-warm-white">
          <div className="font-serif font-bold text-charcoal mb-2">
            {locale === 'fr' ? active.fr_term : active.term}
          </div>
          <div className="text-sm text-gray-600 font-sans">
            {locale === 'fr' ? active.fr_definition : active.definition}
          </div>
        </div>
      )}
    </div>
  );
}
