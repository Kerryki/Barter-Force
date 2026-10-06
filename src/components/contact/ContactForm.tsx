'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContactSubmit } from '@/components/contact/useContactSubmit';
import {
  CONTACT_TOPICS,
  contactFormSchema,
  type ContactFormData,
  type ContactFormInput,
} from '@/lib/validation';

interface A11yProps {
  id: string;
  'aria-invalid': boolean;
  'aria-describedby'?: string;
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: (a11y: A11yProps) => ReactNode;
}

/** Label, control and error message wired together for assistive technology. */
function Field({ id, label, error, children }: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': error ? errorId : undefined })}
      {error && (
        <p id={errorId} role="alert" className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const t = useTranslations('contact.form');
  const locale = useLocale();
  const { status, errorMessage, firstName, submit } = useContactSubmit(locale, t('errorMessage'));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInput, unknown, ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { topic: undefined, consent: false },
  });

  const fieldError = (message?: string) => (message ? t(`errors.${message}`) : undefined);
  const onSubmit = async (data: ContactFormData) => {
    if (await submit(data)) reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field id="name" label={t('nameLabel')} error={fieldError(errors.name?.message)}>
        {(a11y) => <input {...a11y} type="text" autoComplete="name" aria-required="true" {...register('name')} />}
      </Field>
      <Field id="email" label={t('emailLabel')} error={fieldError(errors.email?.message)}>
        {(a11y) => <input {...a11y} type="email" autoComplete="email" aria-required="true" {...register('email')} />}
      </Field>
      <Field id="phone" label={t('phoneLabel')} error={fieldError(errors.phone?.message)}>
        {(a11y) => <input {...a11y} type="tel" autoComplete="tel" {...register('phone')} />}
      </Field>
      <Field id="topic" label={t('topicLabel')} error={fieldError(errors.topic && 'topicRequired')}>
        {(a11y) => (
          <select {...a11y} defaultValue="" aria-required="true" {...register('topic')}>
            <option value="" disabled>
              {t('topicPlaceholder')}
            </option>
            {CONTACT_TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {t(`topics.${topic}`)}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field id="message" label={t('messageLabel')} error={fieldError(errors.message?.message)}>
        {(a11y) => <textarea {...a11y} {...register('message')} />}
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it */}
      <div aria-hidden="true" style={{ position: 'absolute', left: -9999 }}>
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="check">
        <input
          id="consent"
          type="checkbox"
          aria-required="true"
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? 'consent-error' : undefined}
          {...register('consent')}
        />
        <label htmlFor="consent" style={{ margin: 0 }}>
          {t('consentLabel')}{' '}
          <Link href={`/${locale}/privacy`} style={{ textDecoration: 'underline' }}>
            {t('privacyLinkLabel')}
          </Link>
          .
        </label>
      </div>
      {errors.consent && (
        <p id="consent-error" role="alert" className="field-error">
          {fieldError(errors.consent.message)}
        </p>
      )}

      <div aria-live="polite">
        {status === 'success' && <p className="status ok">{t('successMessage', { firstName })}</p>}
        {status === 'error' && <p className="status bad">{errorMessage}</p>}
      </div>

      <button className="btn" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? t('sendingLabel') : t('sendLabel')}
      </button>
      <p className="note">{t('privacyNote')}</p>
    </form>
  );
}
