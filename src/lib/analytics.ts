const CONSENT_FLAG = 'barter-force-consent';

/**
 * Check if user has given analytics consent
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const consent = localStorage.getItem(CONSENT_FLAG);
    return consent === 'true';
  } catch (error) {
    console.warn('Failed to check analytics consent:', error);
    return false;
  }
}

/**
 * Track a page view (if consent is given)
 */
export function trackPageView(path: string): void {
  if (!hasAnalyticsConsent()) return;

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
    });
  }
}

/**
 * Track a custom event (if consent is given)
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>): void {
  if (!hasAnalyticsConsent()) return;

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData || {});
  }
}

/**
 * Initialize Google Analytics (only if consent is given)
 */
export function initializeAnalytics(gaId: string): void {
  if (!hasAnalyticsConsent()) return;

  if (typeof window !== 'undefined') {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: any[]) {
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', gaId);
  }
}

// Global type declarations
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}
