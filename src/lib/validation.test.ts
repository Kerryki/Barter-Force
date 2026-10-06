import { describe, expect, it } from 'vitest';
import { contactFormSchema } from './validation';

const valid = {
  name: 'Marie Tremblay',
  email: 'marie@example.com',
  phone: '514-555-0123',
  topic: 'mortgages',
  message: 'I would like to discuss renewing my mortgage.',
  consent: true,
  website: '',
};

function errorKeys(input: unknown): string[] {
  const result = contactFormSchema.safeParse(input);
  return result.success ? [] : result.error.issues.map((i) => i.message);
}

describe('contactFormSchema', () => {
  it('accepts a complete valid submission', () => {
    expect(contactFormSchema.safeParse(valid).success).toBe(true);
  });

  it('treats phone as optional and defaults to empty', () => {
    const { phone: _phone, ...rest } = valid;
    const result = contactFormSchema.safeParse(rest);
    expect(result.success && result.data.phone).toBe('');
    expect(contactFormSchema.safeParse({ ...valid, phone: '' }).success).toBe(true);
  });

  it('accepts international phone formats', () => {
    expect(contactFormSchema.safeParse({ ...valid, phone: '+1 (514) 555-0123' }).success).toBe(true);
  });

  it('rejects malformed phone numbers', () => {
    expect(errorKeys({ ...valid, phone: 'abc' })).toContain('phoneInvalid');
    expect(errorKeys({ ...valid, phone: '12345' })).toContain('phoneInvalid');
  });

  it('requires a known topic', () => {
    expect(errorKeys({ ...valid, topic: undefined })).toContain('topicRequired');
    expect(errorKeys({ ...valid, topic: 'barter' })).toContain('topicRequired');
  });

  it('treats the message as optional', () => {
    expect(contactFormSchema.safeParse({ ...valid, message: '' }).success).toBe(true);
    const { message: _m, ...rest } = valid;
    const result = contactFormSchema.safeParse(rest);
    expect(result.success && result.data.message).toBe('');
  });

  it('requires consent to be true', () => {
    expect(errorKeys({ ...valid, consent: false })).toContain('consentRequired');
  });

  it('validates name, email and message', () => {
    expect(errorKeys({ ...valid, name: 'A' })).toContain('nameTooShort');
    expect(errorKeys({ ...valid, email: 'nope' })).toContain('emailInvalid');
    expect(errorKeys({ ...valid, message: 'x'.repeat(5001) })).toContain('messageTooLong');
  });

  it('keeps the honeypot field and defaults it to empty', () => {
    const { website: _w, ...rest } = valid;
    const result = contactFormSchema.safeParse(rest);
    expect(result.success && result.data.website).toBe('');
    expect(contactFormSchema.safeParse({ ...valid, website: 'bot.example' }).success).toBe(true);
  });

  it('trims whitespace before validating', () => {
    expect(errorKeys({ ...valid, name: '  A  ' })).toContain('nameTooShort');
  });
});
