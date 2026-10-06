export interface Suggestion {
  label: string;
  question: string;
  answer: string;
}

/**
 * The assistant has no live AI behind it. A suggested question (or the same text typed exactly)
 * gets its fixed answer; anything else gets the "not available" notice.
 */
export function answerFor(question: string, suggestions: Suggestion[], unavailable: string): string {
  const text = question.trim();
  return suggestions.find((s) => s.question === text)?.answer ?? unavailable;
}
