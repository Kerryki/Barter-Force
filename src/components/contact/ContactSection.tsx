import { useTranslations } from 'next-intl';
import { CalendarEmbed } from '@/components/contact/CalendarEmbed';
import { ContactForm } from '@/components/contact/ContactForm';
import { Section } from '@/components/layout/Section';
import { broker } from '@/content/broker';
import { getCalendarLinks } from '@/lib/calendar';

interface ContactSectionProps {
  /** Show the "Begin with a conversation" heading (the /contact page has its own title). */
  showHeading?: boolean;
  /** Open the "write instead" form straight away. */
  formOpen?: boolean;
}

export function ContactSection({ showHeading = true, formOpen = false }: ContactSectionProps) {
  const t = useTranslations('contactSection');
  const calendar = getCalendarLinks(process.env.NEXT_PUBLIC_CALENDAR_URL);
  const todo = t('contactTodo');

  return (
    <Section id="contact" className="contact" wrapClassName="grid">
      <div className="info">
        {showHeading && <h2>{t('title')}</h2>}
        <p style={showHeading ? { marginTop: 24 } : undefined}>{t('description')}</p>
        <dl>
          <dt>{t('emailLabel')}</dt>
          <dd>{broker.email ?? todo}</dd>
          <dt>{t('phoneLabel')}</dt>
          <dd>{broker.phone ?? todo}</dd>
          <dt>{t('locationLabel')}</dt>
          <dd>{t('locationValue')}</dd>
        </dl>
      </div>
      <div>
        <div className="card cal">
          <h3>{t('calendarTitle')}</h3>
          {calendar ? (
            <>
              <CalendarEmbed embedUrl={calendar.embedUrl} title={t('calendarTitle')} />
              <a className="btn" href={calendar.pageUrl} target="_blank" rel="noopener noreferrer">
                {t('openBooking')}
              </a>
            </>
          ) : (
            <p className="sub">{t('calendarMissing')}</p>
          )}
        </div>
        <details className="card" style={{ marginTop: 20 }} open={formOpen}>
          <summary>{t('writeInstead')}</summary>
          <ContactForm />
        </details>
      </div>
    </Section>
  );
}
