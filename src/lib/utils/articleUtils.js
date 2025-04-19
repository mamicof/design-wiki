//  design-wiki/src/lib/utils/articleUtils.js

/**
 * 記事一覧を取得（static/content/*.md を fetch で読み込む）
 */
export async function getArticles() {
  const indexRes = await fetch('/content/index.json');
  const index = await indexRes.json();

  const articles = await Promise.all(
    index.map(async ({ slug, path }) => {
      const res = await fetch(path);
      const text = await res.text();

      // frontmatter抽出
      const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
      const match = text.match(frontmatterRegex);
      const rawMeta = match?.[1] || '';
      const body = text.replace(frontmatterRegex, '').trim();

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

      if (data.status !== '公開') return null;

      return {
        ...data,
        slug,
        content: body
      };
    })
  );

  return articles.filter(Boolean).sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * カテゴリとタグ一覧を取得
 */
export async function getCategoriesAndTags() {
  const articles = await getArticles();
  const categoriesSet = new Set();
  const tagsSet = new Set();

  for (const article of articles) {
    if (article.category) categoriesSet.add(article.category);
    if (Array.isArray(article.tags)) {
      article.tags.forEach(tag => tagsSet.add(tag));
    }
  }

  return {
    categories: Array.from(categoriesSet),
    tags: Array.from(tagsSet)
  };
}
