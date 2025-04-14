// src/lib/utils/articleUtils.js
import matter from 'gray-matter';

export async function getArticles() {
  const files = import.meta.glob('/content/*.md', { as: 'raw' });
  const articles = [];

  for (const path in files) {
    const slug = path.split('/').pop().replace('.md', '');
    const content = await files[path]();
    const { data, content: body } = matter(content);

    // 公開ステータスでフィルタ（必要なら "非公開" なども考慮可）
    if (data.status === '非公開') continue;

    articles.push({
      ...data,
      slug,
      content: body
    });
  }

  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}
