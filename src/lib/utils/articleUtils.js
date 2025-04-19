// src/lib/utils/articleUtils.js
import matter from 'gray-matter';

export async function getArticles() {
  const files = import.meta.glob('/content/*.md', {
    query: '?raw',
    import: 'default'
  });

  const articles = [];

  for (const path in files) {
    const slug = path.split('/').pop().replace('.md', '');
    const content = await files[path]();
    console.log('[debug] 読み込み成功:', slug);
    const { data, content: body } = matter(content);

    if (data.status !== '公開') continue;

    articles.push({
      ...data,
      slug,
      content: body
    });
  }

  console.log('[debug] 全記事:', articles.map(a => a.slug));
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getCategoriesAndTags() {
  const articles = await getArticles();
  const categoriesSet = new Set();
  const tagsSet = new Set();

  for (const article of articles) {
    if (article.category) categoriesSet.add(article.category);
    if (Array.isArray(article.tags)) article.tags.forEach(tag => tagsSet.add(tag));
  }

  return {
    categories: Array.from(categoriesSet),
    tags: Array.from(tagsSet)
  };
}
