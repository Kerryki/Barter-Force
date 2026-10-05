'use client';

import { useState } from 'react';
import type { ContactFormData } from '@/lib/validation';

export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

/** Posts the contact form to the API and tracks status, error text and the sender's first name. */
export function useContactSubmit(locale: string, fallbackError: string) {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('');

  const submit = async (data: ContactFormData): Promise<boolean> => {
    setStatus('loading');
    setErrorMessage('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || fallbackError);

      setFirstName(data.name.trim().split(/\s+/)[0]);
      setStatus('success');
      return true;
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : fallbackError);
      return false;
    }
  };

  return { status, errorMessage, firstName, submit };
}
