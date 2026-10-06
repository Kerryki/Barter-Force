import { useTranslations } from 'next-intl';

/** Banner shown until the broker's licensed services are confirmed. */
export function LicenceNotice() {
  const t = useTranslations('services');
  return (
    <p role="note" className="notice">
      {t('licenceNotice')}
    </p>
  );
}
