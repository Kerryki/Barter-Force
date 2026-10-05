import { Resend } from 'resend';
import type { ContactFormData } from '@/lib/validation';

/** HTML-escape user input before placing it in an email body. */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/** Collapse line breaks so user text can never add email header lines. */
export function singleLine(text: string): string {
  return text.replace(/[\r\n]+/g, ' ').trim();
}

export function renderContactEmail(data: ContactFormData): string {
  return `
    <h2>New contact request</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone || 'not provided')}</p>
    <p><strong>Topic:</strong> ${escapeHtml(data.topic)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
  `;
}

export interface EmailConfig {
  apiKey: string;
  from: string;
  to: string;
}

/**
 * Read email settings from the environment. Returns null when required values are missing.
 * In production both RESEND_FROM_EMAIL and RESEND_TO_EMAIL must be set so mail never goes
 * to a placeholder address; outside production, Resend's sandbox sender is used.
 */
export function readEmailConfig(env: Record<string, string | undefined> = process.env): EmailConfig | null {
  const apiKey = env.RESEND_API_KEY;
  const to = env.RESEND_TO_EMAIL;
  const from = env.RESEND_FROM_EMAIL || (env.NODE_ENV === 'production' ? undefined : 'onboarding@resend.dev');
  if (!apiKey || !to || !from) return null;
  return { apiKey, from, to };
}

/** Send the request to the broker's inbox. Returns an error message, or null on success. */
export async function sendContactEmail(data: ContactFormData, config: EmailConfig): Promise<string | null> {
  const resend = new Resend(config.apiKey);
  const { error } = await resend.emails.send({
    from: config.from,
    to: config.to,
    subject: `New contact request from ${singleLine(data.name)}`,
    html: renderContactEmail(data),
    replyTo: data.email,
  });
  return error ? error.message : null;
}
