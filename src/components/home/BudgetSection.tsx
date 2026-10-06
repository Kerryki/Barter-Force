'use client';

import { useId, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { computeBudget, formatMoney, parseAmount } from '@/lib/calculators';

function BudgetResult({ income, essentials, other }: { income: number; essentials: number; other: number }) {
  const t = useTranslations('budget');
  const locale = useLocale();
  const r = computeBudget(income, essentials, other);
  const money = (n: number) => formatMoney(n, locale);
  const message = { none: 'msgNone', over: 'msgOver', good: 'msgGood', low: 'msgLow' }[r.status];

  return (
    <div aria-live="polite">
      <div className="row first">
        <span>{t('result')}</span>
      </div>
      <div className={`big${r.left < 0 ? ' neg' : ''}`}>{money(r.left)}</div>
      <div className="sub">{income > 0 ? `${Math.round(r.rate)}% ${t('ofIncome')}` : ''}</div>
      <div className="bar">
        <i style={{ width: `${r.barPercent}%` }} />
      </div>
      <div className="fine" style={{ margin: '0 0 14px' }}>
        {t('guideCommon')}
      </div>
      <div className="row">
        <span>{t('guideNeeds')}</span>
        <b>{money(r.needs)}</b>
      </div>
      <div className="row">
        <span>{t('guideWants')}</span>
        <b>{money(r.wants)}</b>
      </div>
      <div className="row">
        <span>{t('guideSavings')}</span>
        <b>{money(r.savings)}</b>
      </div>
      <p style={{ margin: '16px 0 0' }}>{t(message)}</p>
    </div>
  );
}

export function BudgetSection() {
  const t = useTranslations('budget');
  const id = useId();
  const [income, setIncome] = useState('4000');
  const [essentials, setEssentials] = useState('2200');
  const [other, setOther] = useState('900');
  const tips = t.raw('tips') as Array<{ title: string; text: string }>;

  return (
    <Section id="budget" wrapClassName="two">
      <div>
        <h2>{t('title')}</h2>
        <p className="sub" style={{ marginTop: 24 }}>{t('intro1')}</p>
        <p className="sub">{t('intro2')}</p>
        <ul className="plain">
          {tips.map((tip) => (
            <li key={tip.title}>
              <strong>{tip.title}</strong>
              {tip.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="tool">
        <label htmlFor={`${id}-income`}>{t('income')}</label>
        <input id={`${id}-income`} type="number" min="0" inputMode="decimal" value={income}
          onChange={(e) => setIncome(e.target.value)} />
        <label htmlFor={`${id}-essentials`}>{t('essentials')}</label>
        <input id={`${id}-essentials`} type="number" min="0" inputMode="decimal" value={essentials}
          onChange={(e) => setEssentials(e.target.value)} />
        <label htmlFor={`${id}-other`}>{t('other')}</label>
        <input id={`${id}-other`} type="number" min="0" inputMode="decimal" value={other}
          onChange={(e) => setOther(e.target.value)} />
        <BudgetResult income={parseAmount(income)} essentials={parseAmount(essentials)} other={parseAmount(other)} />
        <p className="fine">{t('fine')}</p>
      </div>
    </Section>
  );
}
