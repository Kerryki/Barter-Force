#!/usr/bin/env node
/**
 * Launch gate. Fails (exit 1) when content is not ready for production:
 *   1. any "[TODO" placeholder remains in messages, content files or articles
 *   2. en.json and fr.json do not have identical key structure
 *   3. src/content/broker.ts still has null (unconfirmed) fields
 *   4. an article is missing its EN or FR counterpart, or the pair disagrees on
 *      slug / published flag, or a published article is under the word minimum
 * Articles with `published: false` are reported as warnings (they stay hidden
 * in production), not failures.
 *
 * Usage:
 *   node scripts/content-check.mjs                    full check, exit 1 on failure
 *   node scripts/content-check.mjs --production-only  only enforce when VERCEL_ENV=production
 *                                                     or CONTENT_CHECK_STRICT=true
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const MIN_ARTICLE_WORDS = 800;
const TODO = /\[TODO/;

/** Flatten a JSON value into path strings; arrays record their length too. */
export function collectPaths(value, prefix = '') {
  if (Array.isArray(value)) {
    return [`${prefix}[${value.length}]`, ...value.flatMap((v, i) => collectPaths(v, `${prefix}[${i}]`))];
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => collectPaths(v, prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
}

/** Return the paths of every string in a JSON value that contains a TODO marker. */
export function findTodosInJson(value, prefix = '') {
  if (typeof value === 'string') return TODO.test(value) ? [prefix] : [];
  if (Array.isArray(value)) return value.flatMap((v, i) => findTodosInJson(v, `${prefix}[${i}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => findTodosInJson(v, prefix ? `${prefix}.${k}` : k));
  }
  return [];
}

export function compareKeys(en, fr) {
  const a = new Set(collectPaths(en));
  const b = new Set(collectPaths(fr));
  return {
    missingInFr: [...a].filter((p) => !b.has(p)),
    extraInFr: [...b].filter((p) => !a.has(p)),
  };
}

/** Lines of a source file that hold a TODO marker or an unconfirmed `null` value. */
export function findUnconfirmedInSource(source, { checkNulls }) {
  const hits = [];
  source.split('\n').forEach((line, i) => {
    if (TODO.test(line)) hits.push({ line: i + 1, text: line.trim(), kind: 'TODO' });
    else if (checkNulls && /:\s*null\b/.test(line)) hits.push({ line: i + 1, text: line.trim(), kind: 'null' });
  });
  return hits;
}

export function parseArticle(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const data = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) data[m[1]] = m[2].replace(/^"(.*)"$/, '$1');
  }
  return { data, body: match[2] };
}

export function wordCount(text) {
  return (text.match(/[\p{L}\p{N}'’-]+/gu) || []).length;
}

export function checkArticles(files, read) {
  const failures = [];
  const warnings = [];
  const slugs = new Map();
  for (const f of files) {
    const m = f.match(/^(.+?)(?:\.(en|fr))?\.mdx$/);
    if (!m) continue;
    const [, slug, loc = 'en'] = m;
    slugs.set(slug, { ...(slugs.get(slug) || {}), [loc]: f });
  }
  for (const [slug, pair] of slugs) {
    if (!pair.en || !pair.fr) {
      failures.push(`article "${slug}" is missing its ${pair.en ? 'French (.fr.mdx)' : 'English (.mdx)'} version`);
      continue;
    }
    const en = parseArticle(read(pair.en));
    const fr = parseArticle(read(pair.fr));
    if (en.data.slug !== fr.data.slug || en.data.slug !== slug) {
      failures.push(`article "${slug}": frontmatter slug must match the file name in both languages`);
    }
    const published = (d) => d.published !== 'false';
    if (published(en.data) !== published(fr.data)) {
      failures.push(`article "${slug}": EN and FR disagree on "published"`);
    }
    for (const [loc, a] of [['en', en], ['fr', fr]]) {
      if (TODO.test(a.body) || TODO.test(JSON.stringify(a.data))) {
        failures.push(`article "${slug}" (${loc}) contains a [TODO] placeholder`);
      }
    }
    if (!published(en.data)) {
      warnings.push(`article "${slug}" is unpublished (published: false); it stays hidden in production`);
      continue;
    }
    for (const [loc, a] of [['en', en], ['fr', fr]]) {
      const words = wordCount(a.body);
      if (words < MIN_ARTICLE_WORDS) {
        failures.push(`article "${slug}" (${loc}) has ${words} words; minimum is ${MIN_ARTICLE_WORDS}`);
      }
    }
  }
  return { failures, warnings };
}

export function runChecks(root = ROOT) {
  const failures = [];
  const warnings = [];
  const readJson = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

  const en = readJson('src/messages/en.json');
  const fr = readJson('src/messages/fr.json');

  const { missingInFr, extraInFr } = compareKeys(en, fr);
  missingInFr.forEach((p) => failures.push(`fr.json is missing key: ${p}`));
  extraInFr.forEach((p) => failures.push(`fr.json has extra key: ${p}`));

  for (const [name, data] of [['en.json', en], ['fr.json', fr]]) {
    findTodosInJson(data).forEach((p) => failures.push(`${name}: [TODO] at ${p}`));
  }

  const contentDir = join(root, 'src/content');
  for (const file of readdirSync(contentDir).filter((f) => f.endsWith('.ts'))) {
    const src = readFileSync(join(contentDir, file), 'utf8');
    for (const h of findUnconfirmedInSource(src, { checkNulls: file === 'broker.ts' })) {
      failures.push(`src/content/${file}:${h.line}: ${h.kind === 'null' ? 'unconfirmed value' : '[TODO]'}: ${h.text}`);
    }
  }

  const articlesDir = join(root, 'src/blog/articles');
  let files = [];
  try {
    files = readdirSync(articlesDir).filter((f) => f.endsWith('.mdx'));
  } catch {
    /* no articles directory: fine for launch */
  }
  const articles = checkArticles(files, (f) => readFileSync(join(articlesDir, f), 'utf8'));
  failures.push(...articles.failures);
  warnings.push(...articles.warnings);

  return { failures, warnings };
}

function main() {
  const productionOnly = process.argv.includes('--production-only');
  const enforce = !productionOnly || process.env.VERCEL_ENV === 'production' || process.env.CONTENT_CHECK_STRICT === 'true';
  const { failures, warnings } = runChecks();

  warnings.forEach((w) => console.warn(`warning: ${w}`));

  if (failures.length === 0) {
    console.log('content-check: passed');
    return;
  }
  failures.forEach((f) => console.error(`FAIL: ${f}`));
  console.error(`\ncontent-check: ${failures.length} problem(s) block launch.`);
  if (!enforce) {
    console.error('Not a production build, so this is a report only (exit 0).');
    return;
  }
  process.exit(1);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main();
