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
    const { data, content: body } = matter(content);

    if (data.status !== '公開') continue;

    articles.push({
      ...data,
      slug,
      content: body
    });
  }

  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}
