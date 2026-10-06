import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { broker } from '@/content/broker';

const LINKS = [
  { path: 'how-it-works', key: 'nav.howItWorks' },
  { path: 'about', key: 'nav.about' },
  { path: 'fees', key: 'footer.links.fees' },
  { path: 'learning', key: 'nav.learning' },
  { path: 'privacy', key: 'footer.links.privacy' },
  { path: 'terms', key: 'footer.links.terms' },
] as const;

/** Real licence details once confirmed in broker.ts, otherwise the translated placeholder. */
function useLicenceLine(): string {
  const t = useTranslations('footer');
  const confirmed = broker.licences.every((l) => l.name && l.number && l.regulator);
  if (!confirmed) return t('licenceLine');
  return broker.licences.map((l) => `${l.name}, ${l.number} (${l.regulator})`).join(' · ');
}

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const licenceLine = useLicenceLine();

  return (
    <footer className="sitefooter">
      <div className="wrap">
        <p className="flogo">
          <Image src="/logo.png" alt="" width={56} height={56} />
          <span>
            <strong>{broker.businessName}</strong> · {t('footer.location')}
          </span>
        </p>
        <ul className="links">
          {LINKS.map(({ path, key }) => (
            <li key={path}>
              <Link href={`/${locale}/${path}`}>{t(key)}</Link>
            </li>
          ))}
        </ul>
        <p>
          {t('footer.disclaimer')} {licenceLine}
        </p>
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  );
}
