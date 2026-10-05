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
    <div
      role="region"
      aria-label={t('title')}
      className="fixed bottom-0 left-0 right-0 bg-charcoal text-warm-white p-6 shadow-2xl z-50"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="font-serif font-bold text-lg mb-2">{t('title')}</h3>
          <p className="text-sm text-gray-300">
            {t('description')}{' '}
            <Link href={`/${locale}/privacy`} className="underline hover:text-gold">
              {t('learnMore')}
            </Link>
          </p>
        </div>
        <div className="flex gap-4 flex-shrink-0">
          <button
            onClick={reject}
            className="px-4 py-2 border border-gold text-gold rounded-md hover:bg-gold hover:text-charcoal transition-colors text-sm font-medium"
          >
            {t('rejectLabel')}
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 bg-gold text-charcoal rounded-md hover:bg-warm-white transition-colors text-sm font-medium"
          >
            {t('acceptLabel')}
          </button>
        </div>
      </div>
    </div>
  );
}
