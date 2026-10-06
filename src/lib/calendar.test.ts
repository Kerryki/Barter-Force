import { describe, expect, it } from 'vitest';
import { getCalendarLinks } from './calendar';

describe('getCalendarLinks', () => {
  it('accepts https Calendly and Cal.com links and builds the embed URL', () => {
    expect(getCalendarLinks('https://calendly.com/emile/intro')?.embedUrl).toBe('https://calendly.com/emile/intro/embed');
    expect(getCalendarLinks('https://cal.com/emile/intro')?.embedUrl).toBe('https://cal.com/emile/intro?embed=true');
    expect(getCalendarLinks('https://app.cal.com/emile')?.pageUrl).toBe('https://app.cal.com/emile');
  });

  it('rejects missing, non-https, lookalike and unparsable URLs', () => {
    expect(getCalendarLinks(undefined)).toBeNull();
    expect(getCalendarLinks('http://calendly.com/emile')).toBeNull();
    expect(getCalendarLinks('https://evil-calendly.com/emile')).toBeNull();
    expect(getCalendarLinks('https://calendly.com.evil.example/emile')).toBeNull();
    expect(getCalendarLinks('javascript:alert(1)')).toBeNull();
    expect(getCalendarLinks('not a url')).toBeNull();
  });
});
