import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { readEmailConfig, sendContactEmail } from '@/lib/contact-email';
import { getClientIp, isRateLimited } from '@/lib/rate-limit';
import { contactFormSchema } from '@/lib/validation';

const MAX_BODY_BYTES = 20_000;

function fail(error: string, status: number) {
  return NextResponse.json({ success: false, error }, { status });
}

/** Reject cross-site posts: when the browser sends an Origin, it must match this host. */
function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get('host');
  } catch {
    return false;
  }
}

async function readJson(request: NextRequest): Promise<unknown | undefined> {
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isSameOrigin(request)) return fail('Forbidden', 403);
    if (await isRateLimited(getClientIp(request.headers))) {
      return fail('Too many requests. Please try again later.', 429);
    }

    const body = await readJson(request);
    if (body === undefined) return fail('Invalid or oversized request body', 400);

    const data = contactFormSchema.parse(body);

    // Honeypot filled: pretend success so bots learn nothing
    if (data.website) return NextResponse.json({ success: true });

    const config = readEmailConfig();
    if (!config) {
      if (process.env.NODE_ENV === 'production') {
        console.error('Email is not configured: set RESEND_API_KEY, RESEND_FROM_EMAIL and RESEND_TO_EMAIL');
        return fail('Email service unavailable', 503);
      }
      return NextResponse.json({ success: true, message: 'Email service not configured; message not sent.' });
    }

    const sendError = await sendContactEmail(data, config);
    if (sendError) {
      console.error('Resend error:', sendError);
      return fail('Failed to send email. Please try again later.', 500);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) return fail('Invalid form data', 400);
    console.error('Contact form error:', error);
    return fail('An error occurred. Please try again later.', 500);
  }
}
