import { afterEach, describe, expect, it, vi } from 'vitest';
import { escapeHtml, readEmailConfig, renderContactEmail, singleLine } from './contact-email';
import { getClientIp, isRateLimited } from './rate-limit';

describe('contact email helpers', () => {
  it('escapes HTML and strips line breaks from header text', () => {
    expect(escapeHtml(`<b>"x" & 'y'</b>`)).toBe('&lt;b&gt;&quot;x&quot; &amp; &#x27;y&#x27;&lt;/b&gt;');
    expect(singleLine('Marie\r\nBcc: evil@example.com')).toBe('Marie Bcc: evil@example.com');
  });

  it('escapes every field in the rendered body', () => {
    const html = renderContactEmail({
      name: '<script>alert(1)</script>',
      email: 'a@b.co',
      phone: '',
      topic: 'mortgages',
      message: 'line1\n<img src=x onerror=1>',
      website: '',
      consent: true,
    });
    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<img');
    expect(html).toContain('line1<br>');
  });

  it('requires recipient and sender in production', () => {
    const base = { RESEND_API_KEY: 'k' };
    expect(readEmailConfig({ ...base, NODE_ENV: 'production', RESEND_TO_EMAIL: 'me@x.ca' })).toBeNull();
    expect(readEmailConfig({ ...base, NODE_ENV: 'production', RESEND_FROM_EMAIL: 'a@x.ca' })).toBeNull();
    expect(
      readEmailConfig({ ...base, NODE_ENV: 'production', RESEND_FROM_EMAIL: 'a@x.ca', RESEND_TO_EMAIL: 'me@x.ca' })
    ).toEqual({ apiKey: 'k', from: 'a@x.ca', to: 'me@x.ca' });
  });

  it('falls back to the Resend sandbox sender outside production', () => {
    const config = readEmailConfig({ RESEND_API_KEY: 'k', RESEND_TO_EMAIL: 'me@x.ca' });
    expect(config?.from).toBe('onboarding@resend.dev');
  });
});

describe('rate limiting', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('allows a few requests per client, then limits, per IP', async () => {
    const ip = `test-${Math.random()}`;
    const results = [];
    for (let i = 0; i < 4; i++) results.push(await isRateLimited(ip));
    expect(results).toEqual([false, false, false, true]);
    expect(await isRateLimited(`other-${Math.random()}`)).toBe(false);
  });

  it('uses the shared store when configured and falls back to memory if it fails', async () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://redis.example');
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 't');
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(JSON.stringify([{ result: 4 }, { result: 1 }]), { status: 200 }));
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(await isRateLimited('shared-ip')).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    fetchMock.mockRejectedValueOnce(new Error('down'));
    expect(await isRateLimited(`fallback-${Math.random()}`)).toBe(false);
  });

  it('prefers platform-set IP headers over client-supplied ones', () => {
    const headers = new Headers({
      'x-forwarded-for': '1.1.1.1',
      'x-real-ip': '2.2.2.2',
      'x-vercel-forwarded-for': '3.3.3.3',
    });
    expect(getClientIp(headers)).toBe('3.3.3.3');
    expect(getClientIp(new Headers())).toBe('unknown');
  });
});
