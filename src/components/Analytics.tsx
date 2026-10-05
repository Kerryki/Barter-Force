'use client';

import { useEffect } from 'react';
import { hasAnalyticsConsent, initializeAnalytics } from '@/lib/analytics';

export function Analytics() {
  useEffect(() => {
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (!gaId) return;

    // Only initialize if consent is already given
    if (hasAnalyticsConsent()) {
      initializeAnalytics(gaId);
    }
  }, []);

  return null;
}
