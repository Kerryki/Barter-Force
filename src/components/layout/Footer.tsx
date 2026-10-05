import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { broker } from '@/content/broker';

const NAV_LINKS = [
  { path: 'services', key: 'nav.services' },
  { path: 'how-it-works', key: 'nav.howItWorks' },
  { path: 'about', key: 'nav.about' },
  { path: 'learning', key: 'nav.learning' },
] as const;

const LEGAL_LINKS = [
  { path: 'fees', key: 'footer.links.fees' },
  { path: 'privacy', key: 'footer.links.privacy' },
  { path: 'terms', key: 'footer.links.terms' },
  { path: 'contact', key: 'footer.links.contact' },
] as const;

interface LinkColumnProps {
  heading: string;
  links: ReadonlyArray<{ path: string; key: string }>;
}

function LinkColumn({ heading, links }: LinkColumnProps) {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <nav aria-label={heading}>
      <p className="font-serif font-bold mb-3">{heading}</p>
      <ul className="space-y-2 font-sans text-sm">
        {links.map(({ path, key }) => (
          <li key={path}>
            <Link href={`/${locale}/${path}`} className="hover:text-gold transition-colors">
              {t(key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Real licence details once confirmed in broker.ts, otherwise the translated placeholder. */
function useLicenceLine(): string {
  const t = useTranslations('footer');
  const confirmed = broker.licences.every((l) => l.name && l.number && l.regulator);
  if (!confirmed) return t('licenceLine');
  return broker.licences.map((l) => `${l.name}, ${l.number} (${l.regulator})`).join(' · ');
}

export function Footer() {
  const t = useTranslations('footer');
  const licenceLine = useLicenceLine();

  return (
    <footer className="bg-charcoal text-warm-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-serif font-bold text-xl">{broker.businessName}</p>
            <p className="mt-2 text-sm text-gray-300 font-sans">{t('tagline')}</p>
          </div>
          <LinkColumn heading={t('navHeading')} links={NAV_LINKS} />
          <LinkColumn heading={t('legalHeading')} links={LEGAL_LINKS} />
        </div>

        <div className="mt-10 border-t border-gold/30 pt-6 space-y-3 text-xs text-gray-300 font-sans">
          <p>{licenceLine}</p>
          <p>{t('disclaimer')}</p>
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
