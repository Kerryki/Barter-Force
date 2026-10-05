interface CalendarEmbedProps {
  url?: string;
  title?: string;
}

const ALLOWED_HOSTS = ['calendly.com', 'cal.com'];

/**
 * Check if hostname matches allowed hosts (exact or subdomain)
 */
function isAllowedHost(hostname: string | null): boolean {
  if (!hostname) return false;
  return ALLOWED_HOSTS.some(host => hostname === host || hostname.endsWith('.' + host));
}

/**
 * Validate and normalize calendar embed URL
 */
function validateAndNormalizeUrl(url: string): string | null {
  try {
    const parsed = new URL(url);

    // Reject non-https URLs
    if (parsed.protocol !== 'https:') {
      return null;
    }

    // Check if host is in allowlist (exact match or subdomain)
    if (!isAllowedHost(parsed.hostname)) {
      return null;
    }

    return url;
  } catch {
    return null;
  }
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

export function CalendarEmbed({ url, title = 'Book a Call' }: CalendarEmbedProps) {
  if (!url) return null;

  const validatedUrl = validateAndNormalizeUrl(url);
  if (!validatedUrl) {
    console.warn('Invalid calendar URL:', url);
    return null;
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-serif font-bold text-charcoal mb-6 text-center">{title}</h3>
      <div className="rounded-lg overflow-hidden shadow-lg" style={{ height: '600px' }}>
        <iframe
          src={toEmbedUrl(validatedUrl)}
          width="100%"
          height="100%"
          frameBorder={0}
          title={title}
          style={{ border: 'none' }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  );
}
