'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useForm, type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContactSubmit } from '@/components/contact/useContactSubmit';
import {
  CONTACT_TOPICS,
  contactFormSchema,
  type ContactFormData,
  type ContactFormInput,
} from '@/lib/validation';

const INPUT_CLASS =
  'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold text-charcoal';

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
      <label htmlFor={id} className="block text-sm font-medium text-charcoal mb-2">
        {label}
      </label>
      {children({
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': error ? errorId : undefined,
      })}
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function ConsentField({
  error,
  registration,
}: {
  error?: string;
  registration: ReturnType<ReturnType<typeof useForm<ContactFormInput>>['register']>;
}) {
  const t = useTranslations('contact.form');
  const locale = useLocale();
  return (
    <div>
      <div className="flex items-start">
        <input
          id="consent"
          type="checkbox"
          className="w-4 h-4 mt-1 text-gold rounded focus:ring-2 focus:ring-gold"
          aria-required="true"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'consent-error' : undefined}
          {...registration}
        />
        <label htmlFor="consent" className="ml-2 text-sm text-charcoal">
          {t('consentLabel')}{' '}
          <Link href={`/${locale}/privacy`} className="underline text-charcoal hover:text-gold-dark">
            {t('privacyLinkLabel')}
          </Link>
          .
        </label>
      </div>
      {error && (
        <p id="consent-error" role="alert" className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function TopicField({ register, error }: { register: UseFormRegister<ContactFormInput>; error?: string }) {
  const t = useTranslations('contact.form');
  return (
    <Field id="topic" label={t('topicLabel')} error={error}>
      {(a11y) => (
        <select {...a11y} defaultValue="" className={`${INPUT_CLASS} bg-white`}
          aria-required="true" {...register('topic')}>
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
  );
}

interface FieldsProps {
  register: UseFormRegister<ContactFormInput>;
  errors: FieldErrors<ContactFormInput>;
  fieldError: (message?: string) => string | undefined;
}

function ContactFields({ register, errors, fieldError }: FieldsProps) {
  const t = useTranslations('contact.form');
  return (
    <>
      <Field id="name" label={t('nameLabel')} error={fieldError(errors.name?.message)}>
        {(a11y) => (
          <input {...a11y} type="text" autoComplete="name" placeholder={t('namePlaceholder')}
            className={INPUT_CLASS} aria-required="true" {...register('name')} />
        )}
      </Field>

      <Field id="email" label={t('emailLabel')} error={fieldError(errors.email?.message)}>
        {(a11y) => (
          <input {...a11y} type="email" autoComplete="email" placeholder={t('emailPlaceholder')}
            className={INPUT_CLASS} aria-required="true" {...register('email')} />
        )}
      </Field>

      <Field id="phone" label={t('phoneLabel')} error={fieldError(errors.phone?.message)}>
        {(a11y) => (
          <input {...a11y} type="tel" autoComplete="tel" placeholder={t('phonePlaceholder')}
            className={INPUT_CLASS} {...register('phone')} />
        )}
      </Field>

      <TopicField register={register} error={fieldError(errors.topic && 'topicRequired')} />

      <Field id="message" label={t('messageLabel')} error={fieldError(errors.message?.message)}>
        {(a11y) => (
          <textarea {...a11y} rows={6} placeholder={t('messagePlaceholder')}
            className={INPUT_CLASS} aria-required="true" {...register('message')} />
        )}
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>
    </>
  );
}

function StatusMessage({ status, firstName, errorMessage }: { status: string; firstName: string; errorMessage: string }) {
  const t = useTranslations('contact.form');
  return (
    <div aria-live="polite">
      {status === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <p className="text-green-900">{t('successMessage', { firstName })}</p>
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-900">{errorMessage}</p>
        </div>
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <ContactFields register={register} errors={errors} fieldError={fieldError} />
      <ConsentField error={fieldError(errors.consent?.message)} registration={register('consent')} />
      <StatusMessage status={status} firstName={firstName} errorMessage={errorMessage} />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-gold text-charcoal py-3 rounded-md font-medium hover:bg-warm-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? t('sendingLabel') : t('sendLabel')}
      </button>
    </form>
  );
}
