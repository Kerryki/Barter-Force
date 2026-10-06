'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { initializeAnalytics } from '@/lib/analytics';

const CONSENT_FLAG = 'barter-force-consent';

/** Tracks whether the visitor still has to choose, and records accept or reject in localStorage. */
function useConsentChoice() {
  const [pending, setPending] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_FLAG)) setPending(true);
    } catch (error) {
      // Storage can be blocked (private mode); the banner then stays hidden and analytics stays off
      console.warn('localStorage not available:', error);
    }
  }, []);

  const choose = (accepted: boolean) => {
    try {
      localStorage.setItem(CONSENT_FLAG, accepted ? 'true' : 'false');
      setPending(false);
      const gaId = process.env.NEXT_PUBLIC_GA_ID;
      if (accepted && gaId) initializeAnalytics(gaId);
      if (accepted) window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    } catch (error) {
      console.warn('Failed to set consent:', error);
    }
  };

  return { pending, accept: () => choose(true), reject: () => choose(false) };
}

export function CookieBanner() {
  const t = useTranslations('cookies');
  const locale = useLocale();
  const { pending, accept, reject } = useConsentChoice();

  if (!pending) return null;

  return (
    <div role="region" aria-label={t('title')} className="cookiebar">
      <div className="wrap">
        <div>
          <h3>{t('title')}</h3>
          <p>
            {t('description')}{' '}
            <Link href={`/${locale}/privacy`} style={{ textDecoration: 'underline' }}>
              {t('learnMore')}
            </Link>
          </p>
        </div>
        <div className="actions">
          <button type="button" className="btn ghost" onClick={reject}>
            {t('rejectLabel')}
          </button>
          <button type="button" className="btn" onClick={accept}>
            {t('acceptLabel')}
          </button>
        </div>
      </div>
    </div>
  );
}
