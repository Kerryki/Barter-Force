import { broker } from '@/content/broker';

/**
 * Generate FinancialService JSON-LD structured data.
 * Only includes facts that are confirmed in src/content/broker.ts.
 */
export function generateOrganization() {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: broker.businessName,
    url: broker.siteUrl,
    description:
      'Private financial brokerage in Montréal: mortgages, savings and investing, credit health and protection.',
    areaServed: { '@type': 'AdministrativeArea', name: 'Québec, Canada' },
    availableLanguage: ['English', 'French'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Montréal',
      addressRegion: 'QC',
      addressCountry: 'CA',
    },
  };

  if (broker.email) data.email = broker.email;
  if (broker.openingHours) data.openingHours = broker.openingHours;

  // Fall back to the env var used before broker.ts held the phone number
  const phone = broker.phone || process.env.NEXT_PUBLIC_BUSINESS_PHONE;
  if (phone) {
    data.telephone = phone;
    data.contactPoint = {
      '@type': 'ContactPoint',
      telephone: phone,
      contactType: 'Customer Service',
      availableLanguage: ['English', 'French'],
    };
  }

  return data;
}

/**
 * Generate FAQPage JSON-LD structured data
 */
export function generateFAQPage(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}
