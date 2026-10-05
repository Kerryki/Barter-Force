import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { Analytics } from '@/components/Analytics';
import { generateOrganization } from '@/lib/jsonld';
import { cormorant, manrope } from '@/lib/fonts';
import { locales } from '@/i18n.config';
import { routing } from '@/i18n/routing';
import '@/styles/globals.css';

// Only these namespaces are used by client components; everything else renders on the server
// and does not need to be sent to the browser.
const CLIENT_NAMESPACES = ['common', 'nav', 'cookies', 'faq'] as const;

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const allMessages = await getMessages();
  const messages = {
    ...Object.fromEntries(CLIENT_NAMESPACES.map((namespace) => [namespace, allMessages[namespace]])),
    contact: { form: allMessages.contact.form },
  };
  const tCommon = await getTranslations('common');

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganization()).replace(/</g, '\\u003c') }}
        />
      </head>
      <body className="font-sans bg-warm-white text-charcoal">
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-to-content">
            {tCommon('skipToContent')}
          </a>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow" id="main-content">{children}</main>
            <Footer />
          </div>
          <CookieBanner />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
