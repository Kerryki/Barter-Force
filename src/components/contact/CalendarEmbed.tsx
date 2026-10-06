const ALLOWED_HOSTS = ['calendly.com', 'cal.com'];

export interface CalendarLinks {
  /** The booking page, for the "Open the booking page" button. */
  pageUrl: string;
  /** The embeddable form of the same page. */
  embedUrl: string;
}

function isAllowedHost(hostname: string): boolean {
  return ALLOWED_HOSTS.some((host) => hostname === host || hostname.endsWith('.' + host));
}

/** Turn a validated Calendly or Cal.com link into its embeddable form. */
function toEmbedUrl(validatedUrl: string): string {
  const { hostname, pathname } = new URL(validatedUrl);

  if (hostname.endsWith('calendly.com') && !validatedUrl.includes('/embed')) {
    return validatedUrl.replace(/\/$/, '') + '/embed';
  }
  if (hostname.endsWith('cal.com') && !validatedUrl.includes('embed')) {
    return `https://cal.com/${pathname.slice(1)}?embed=true`;
  }
  return validatedUrl;
}

/**
 * Accept only https links on Calendly or Cal.com. Returns null for a missing or unsafe URL,
 * in which case the contact section shows a placeholder instead of a calendar.
 */
export function getCalendarLinks(url: string | undefined): CalendarLinks | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' || !isAllowedHost(parsed.hostname)) return null;
    return { pageUrl: parsed.toString(), embedUrl: toEmbedUrl(parsed.toString()) };
  } catch {
    return null;
  }
}

export function CalendarEmbed({ embedUrl, title }: { embedUrl: string; title: string }) {
  return (
    <iframe
      src={embedUrl}
      title={title}
      loading="lazy"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
    />
  );
}
