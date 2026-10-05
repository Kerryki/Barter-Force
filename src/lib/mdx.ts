import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  /** Set to false to keep an article out of production until it has been reviewed */
  published?: boolean;
}

export interface Article {
  frontmatter: ArticleFrontmatter;
  content: string;
}

export interface ArticleMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

/** Drafts (published: false) show in dev, or in production when SHOW_DRAFT_ARTICLES=true */
function isVisible(frontmatter: ArticleFrontmatter): boolean {
  if (frontmatter.published !== false) return true;
  return process.env.NODE_ENV !== 'production' || process.env.SHOW_DRAFT_ARTICLES === 'true';
}

const SAFE_SEGMENT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const articlesDir = join(process.cwd(), 'src', 'blog', 'articles');

export async function getArticle(
  slug: string,
  locale: string = 'en'
): Promise<Article | null> {
  // The slug comes from the URL; only allow plain kebab-case names so it can never escape articlesDir
  if (!SAFE_SEGMENT.test(slug) || !/^[a-z]{2}$/.test(locale)) return null;

  try {
    // Try locale-specific file first: [slug].[locale].mdx
    let filePath = join(articlesDir, `${slug}.${locale}.mdx`);
    let fileContent: string;

    try {
      fileContent = readFileSync(filePath, 'utf-8');
    } catch {
      // Fall back to non-locale file: [slug].mdx
      filePath = join(articlesDir, `${slug}.mdx`);
      fileContent = readFileSync(filePath, 'utf-8');
    }

    const { data, content } = matter(fileContent);
    if (!isVisible(data as ArticleFrontmatter)) return null;

    return {
      frontmatter: data as ArticleFrontmatter,
      content,
    };
  } catch {
    return null;
  }
}

/** Unique article slugs from `slug.mdx` and `slug.fr.mdx` style file names. */
function collectSlugs(files: string[]): string[] {
  const slugs = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, '').split('.')[0]);
  return [...new Set(slugs)];
}

export async function getArticlesMetadata(
  locale: string = 'en'
): Promise<ArticleMetadata[]> {
  try {
    const slugs = collectSlugs(readdirSync(articlesDir));
    const loaded = await Promise.all(slugs.map((slug) => getArticle(slug, locale)));

    return loaded
      .filter((article): article is Article => article !== null)
      .map(({ frontmatter }) => ({
        slug: frontmatter.slug,
        title: frontmatter.title,
        date: frontmatter.date,
        excerpt: frontmatter.excerpt,
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}
