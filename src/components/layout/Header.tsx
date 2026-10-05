'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

const NAV_ITEMS = [
  { href: '/services', key: 'services' },
  { href: '/how-it-works', key: 'howItWorks' },
  { href: '/about', key: 'about' },
  { href: '/learning', key: 'learning' },
] as const;

function LocaleSwitch({ className }: { className: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === 'en' ? 'fr' : 'en';
  return (
    <Link href={pathname} locale={otherLocale} className={className}>
      {otherLocale.toUpperCase()}
    </Link>
  );
}

function BookButton({ className }: { className: string }) {
  const t = useTranslations('nav');
  return (
    <Link href="/contact" className={`px-4 py-2 bg-gold text-charcoal rounded-md font-medium hover:bg-warm-white transition-colors ${className}`}>
      {t('bookConsultation')}
    </Link>
  );
}

function DesktopNav() {
  const t = useTranslations('nav');
  return (
    <div className="hidden md:flex items-center gap-8">
      <ul className="flex gap-6 font-sans">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="hover:text-gold transition-colors">
              {t(item.key)}
            </Link>
          </li>
        ))}
      </ul>
      <BookButton className="" />
      <LocaleSwitch className="px-3 py-1 text-sm font-sans hover:text-gold transition-colors" />
    </div>
  );
}

function MobileNav() {
  const t = useTranslations('nav');
  return (
    <details className="md:hidden relative">
      <summary className="list-none cursor-pointer px-2 py-1 font-sans" aria-label={t('menu')}>
        ☰
      </summary>
      <div className="absolute right-0 top-full mt-2 w-56 bg-charcoal border border-gold/30 rounded-md shadow-lg p-4 flex flex-col gap-3">
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className="hover:text-gold transition-colors">
            {t(item.key)}
          </Link>
        ))}
        <BookButton className="text-center" />
        <LocaleSwitch className="hover:text-gold transition-colors" />
      </div>
    </details>
  );
}

export function Header() {
  const t = useTranslations('common');
  return (
    <header className="bg-charcoal text-warm-white sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-serif">
          {t('logo')}
        </Link>
        <DesktopNav />
        <MobileNav />
      </nav>
    </header>
  );
}
