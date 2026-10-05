/** The four blueprint services: URL slug and the matching `services.items` message key. */
export const SERVICES = [
  { slug: 'mortgages', key: 'mortgages' },
  { slug: 'savings-investing', key: 'savingsInvesting' },
  { slug: 'credit-health', key: 'creditHealth' },
  { slug: 'protection', key: 'protection' },
] as const;

export type ServiceSlug = (typeof SERVICES)[number]['slug'];

export const SERVICE_SLUGS: string[] = SERVICES.map((s) => s.slug);

/** Map a URL slug to its `services.items` translation key, or undefined for unknown slugs. */
export function getServiceKey(slug: string): string | undefined {
  return SERVICES.find((s) => s.slug === slug)?.key;
}
