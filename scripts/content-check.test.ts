import { describe, expect, it } from 'vitest';
import * as check from './content-check.mjs';

const words = (n: number) => Array.from({ length: n }, (_, i) => `word${i}`).join(' ');
const article = (slug: string, body: string, published = true) =>
  `---\ntitle: "T"\nslug: "${slug}"\ndate: "2026-01-01"\nexcerpt: "E"\npublished: ${published}\n---\n${body}`;

describe('collectPaths / compareKeys', () => {
  it('reports no differences for identical structures', () => {
    const a = { x: { y: ['a', 'b'] } };
    expect(check.compareKeys(a, { x: { y: ['c', 'd'] } })).toEqual({ missingInFr: [], extraInFr: [] });
  });

  it('detects missing keys, extra keys and array length drift', () => {
    const result = check.compareKeys({ a: 1, list: [1, 2] }, { b: 1, list: [1] });
    expect(result.missingInFr).toContain('a');
    expect(result.extraInFr).toContain('b');
    expect(result.missingInFr).toContain('list[2]');
  });
});

describe('findTodosInJson', () => {
  it('finds nested TODO strings with their paths', () => {
    const found = check.findTodosInJson({ a: 'ok', b: { c: ['fine', 'x [TODO: y]'] } });
    expect(found).toEqual(['b.c[1]']);
  });
});

describe('findUnconfirmedInSource', () => {
  it('flags nulls only when asked and always flags TODOs', () => {
    const src = 'brokerName: null,\n// [TODO: x]\nname: "ok",';
    expect(check.findUnconfirmedInSource(src, { checkNulls: true })).toHaveLength(2);
    expect(check.findUnconfirmedInSource(src, { checkNulls: false })).toHaveLength(1);
  });
});

describe('checkArticles', () => {
  const run = (files: Record<string, string>) =>
    check.checkArticles(Object.keys(files), (f: string) => files[f]);

  it('passes a complete, published pair above the word minimum', () => {
    const body = words(check.MIN_ARTICLE_WORDS + 5);
    const r = run({ 'a.mdx': article('a', body), 'a.fr.mdx': article('a', body) });
    expect(r.failures).toEqual([]);
  });

  it('fails when the French version is missing', () => {
    const r = run({ 'a.mdx': article('a', words(900)) });
    expect(r.failures.join()).toMatch(/missing its French/);
  });

  it('warns, not fails, for unpublished drafts', () => {
    const r = run({ 'a.mdx': article('a', 'short', false), 'a.fr.mdx': article('a', 'court', false) });
    expect(r.failures).toEqual([]);
    expect(r.warnings).toHaveLength(1);
  });

  it('fails when EN and FR disagree on published', () => {
    const r = run({ 'a.mdx': article('a', words(900)), 'a.fr.mdx': article('a', words(900), false) });
    expect(r.failures.join()).toMatch(/disagree/);
  });

  it('fails on a TODO in an article and on a short published article', () => {
    const r = run({
      'a.mdx': article('a', `${words(900)} [TODO: fix]`),
      'a.fr.mdx': article('a', words(10)),
    });
    expect(r.failures.join('\n')).toMatch(/\[TODO\]/);
    expect(r.failures.join('\n')).toMatch(/minimum is/);
  });
});
