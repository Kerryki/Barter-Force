import { describe, expect, it } from 'vitest';
import { answerFor } from './assistant';

const suggestions = [{ label: 'Save', question: 'How much should I save each month?', answer: 'About 20%.' }];

describe('answerFor', () => {
  it('returns the fixed answer for a suggested question, ignoring surrounding spaces', () => {
    expect(answerFor('  How much should I save each month? ', suggestions, 'n/a')).toBe('About 20%.');
  });

  it('falls back to the unavailable notice for anything else', () => {
    expect(answerFor('Should I buy crypto?', suggestions, 'n/a')).toBe('n/a');
    expect(answerFor('', suggestions, 'n/a')).toBe('n/a');
  });
});
