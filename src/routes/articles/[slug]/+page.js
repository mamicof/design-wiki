// design-wiki/src/routes/articles/[slug]/+page.js

/**
 * 記事1件を取得（fetchベース）
 */
export async function load({ params }) {
  const slug = params.slug;
  const path = `/content/${slug}.md`;

  const res = await fetch(path);
  if (!res.ok) {
    return {
      status: 404,
      error: new Error('記事が見つかりません')
    };
  }

  const raw = await res.text();

  // frontmatter抽出
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = raw.match(frontmatterRegex);
  const rawMeta = match?.[1] || '';
  const body = raw.replace(frontmatterRegex, '').trim();

  const data = {};
  for (const line of rawMeta.split('\n')) {
    const [key, ...rest] = line.split(':');
    const value = rest.join(':').trim();
    if (key === 'tags') {
      data.tags = value
        .replace(/^\[|\]$/g, '')
        .split(',')
        .map((t) => t.trim().replace(/^"|"$/g, ''));
    } else {
      data[key.trim()] = value.replace(/^"|"$/g, '');
    }
  }

  return {
    article: {
      ...data,
      slug,
      content: body
    }
  };
}
