import { useTranslations } from 'next-intl';

/** Banner shown until the broker's licensed services are confirmed. */
export function LicenceNotice() {
  const t = useTranslations('services');
  return (
    <p
      role="note"
      className="mb-8 border-l-4 border-gold bg-gold/10 p-4 text-sm font-sans text-charcoal"
    >
      {t('licenceNotice')}
    </p>
  );
}
