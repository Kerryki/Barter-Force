'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

const NAV_ITEMS = [
  { href: '/#services', key: 'services' },
  { href: '/#budget', key: 'budget' },
  { href: '/#leverage', key: 'credit' },
  { href: '/#insurance', key: 'insurance' },
  { href: '/#assistant', key: 'assistant' },
] as const;

export function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations();
  const otherLocale = locale === 'en' ? 'fr' : 'en';

  return (
    <header className="top">
      <div className="wrap">
        <Link className="logo" href="/">
          <Image src="/logo.png" alt={t('common.logoAlt')} width={46} height={46} priority />
          Barter Force
        </Link>
        <nav className="mainnav" aria-label={t('nav.main')}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.key} href={item.href}>
              {t(`nav.${item.key}`)}
            </Link>
          ))}
          <Link
            className="lang"
            href={pathname}
            locale={otherLocale}
            hrefLang={otherLocale}
            aria-label={t('nav.switchLanguage')}
          >
            {otherLocale.toUpperCase()}
          </Link>
          <Link className="btn" href="/#contact">
            {t('nav.bookConsultation')}
          </Link>
        </nav>
      </div>
    </header>
  );
}
