'use client';

import { useId, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { computeLeverage, formatMoney, withSign } from '@/lib/calculators';

export function LeverageSection() {
  const t = useTranslations('leverage');
  const locale = useLocale();
  const id = useId();
  const [change, setChange] = useState(5);
  const r = computeLeverage(change);
  const tone = change < 0 ? 'neg' : '';
  const percent = (n: number) => `${n.toFixed(0)}%`;

  return (
    <Section id="leverage" className="band" wrapClassName="two">
      <div>
        <h2>{t('title')}</h2>
        <p className="sub" style={{ marginTop: 24 }}>{t('intro')}</p>
        <ul className="plain">
          <li>
            <strong>{t('helpsTitle')}</strong>
            {t('helps')}
          </li>
          <li>
            <strong>{t('hurtsTitle')}</strong>
            {t('hurts')}
          </li>
        </ul>
        <p className="sub">{t('closing')}</p>
      </div>
      <div className="tool">
        <p style={{ marginBottom: 10 }}>
          <strong>{t('example')}</strong>
        </p>
        <label htmlFor={`${id}-slider`}>
          {t('slider')} <b>{withSign(change, (n) => `${n}%`)}</b>
        </label>
        <input id={`${id}-slider`} type="range" min={-15} max={20} step={1} value={change}
          onChange={(e) => setChange(Number(e.target.value))} />
        <div aria-live="polite">
          <div className="row">
            <span>{t('rowChange')}</span>
            <b className={tone}>{withSign(r.gain, (n) => formatMoney(n, locale))}</b>
          </div>
          <div className="row">
            <span>{t('rowLeveraged')}</span>
            <b className={tone}>{withSign(r.leveragedReturn, percent)}</b>
          </div>
          <div className="row">
            <span>{t('rowPlain')}</span>
            <b className={tone}>{withSign(r.plainReturn, (n) => `${n}%`)}</b>
          </div>
        </div>
        <p className="fine">{t('fine')}</p>
      </div>
    </Section>
  );
}
