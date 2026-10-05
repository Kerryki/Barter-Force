'use client';

import { useTranslations } from 'next-intl';

export function FAQAccordion() {
  const t = useTranslations('faq');
  const items = t.raw('items') as Array<{ question: string; answer: string }>;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {items.map((item, idx) => (
        <details
          key={idx}
          className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
        >
          <summary className="flex items-center justify-between p-6 text-lg font-serif font-bold text-charcoal hover:bg-gray-50">
            <span>{item.question}</span>
            <span className="text-gold-dark font-bold text-2xl ml-4 flex-shrink-0 group-open:hidden">
              +
            </span>
            <span className="text-gold-dark font-bold text-2xl ml-4 flex-shrink-0 hidden group-open:inline">
              −
            </span>
          </summary>
          <div className="pt-4 px-6 pb-6 border-t border-gray-200">
            <p className="text-gray-700 font-sans leading-relaxed">
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
