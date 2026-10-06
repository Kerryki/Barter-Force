'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';

interface Suggestion {
  label: string;
  question: string;
  answer: string;
}

interface ChatMessage {
  from: 'bot' | 'me';
  text: string;
}

/**
 * "Ask the assistant". There is no live AI behind it: the four suggested questions (and the same
 * text typed exactly) get fixed answers, and anything else points the visitor to a consultation.
 */
export function AssistantSection() {
  const t = useTranslations('assistant');
  const suggestions = t.raw('suggestions') as Suggestion[];
  const [messages, setMessages] = useState<ChatMessage[]>([{ from: 'bot', text: t('greeting') }]);
  const [draft, setDraft] = useState('');
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages]);

  const ask = (question: string) => {
    const text = question.trim();
    if (!text) return;
    const known = suggestions.find((s) => s.question === text);
    setMessages((prev) => [
      ...prev,
      { from: 'me', text },
      { from: 'bot', text: known ? known.answer : t('unavailable') },
    ]);
    setDraft('');
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    ask(draft);
  };

  return (
    <Section id="assistant" className="ai" wrapClassName="two">
      <div>
        <h2>{t('title')}</h2>
        <p className="sub" style={{ marginTop: 24 }}>{t('intro')}</p>
        <p className="sub">{t('note')}</p>
        <div className="terms" role="group" aria-label={t('suggestionsLabel')}>
          {suggestions.map((s) => (
            <button key={s.question} type="button" onClick={() => ask(s.question)}>
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div className="chat">
        <div className="log" ref={logRef} aria-live="polite">
          {messages.map((m, idx) => (
            <div key={idx} className={`msg ${m.from}`}>
              {m.text}
            </div>
          ))}
        </div>
        <form className="ask" onSubmit={onSubmit}>
          <input type="text" value={draft} placeholder={t('placeholder')} aria-label={t('inputLabel')}
            onChange={(e) => setDraft(e.target.value)} />
          <button className="btn" type="submit">
            {t('ask')}
          </button>
        </form>
      </div>
    </Section>
  );
}
