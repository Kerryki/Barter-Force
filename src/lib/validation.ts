import { z } from 'zod';

export const CONTACT_TOPICS = [
  'mortgages',
  'savingsInvesting',
  'creditHealth',
  'protection',
  'notSure',
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

// Digits plus common separators; 10 to 15 digits overall (NANP or international)
const PHONE_PATTERN = /^\+?[\d\s().-]{7,25}$/;

/**
 * Shared contact form validation schema, used by the client form and the API.
 * Error messages are translation keys under `contact.form.errors`.
 */
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'nameTooShort').max(100, 'nameTooLong'),
  email: z.string().trim().email('emailInvalid').max(254, 'emailInvalid'),
  phone: z
    .string()
    .trim()
    .refine(
      (val) => val === '' || (PHONE_PATTERN.test(val) && /^\d{10,15}$/.test(val.replace(/\D/g, ''))),
      'phoneInvalid'
    )
    .optional()
    .default(''),
  topic: z.enum(CONTACT_TOPICS, { error: 'topicRequired' }),
  // Optional, as in the approved design ("Anything you would like me to know (optional)")
  message: z.string().trim().max(5000, 'messageTooLong').optional().default(''),
  // Honeypot: real visitors leave it empty; the API silently discards submissions that fill it
  website: z.string().optional().default(''),
  consent: z.boolean().refine((val) => val === true, 'consentRequired'),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormData = z.output<typeof contactFormSchema>;
