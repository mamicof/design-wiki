// src/lib/utils/articleUtils.js
import matter from 'gray-matter';

/**
 * 記事ファイルをすべて取得して整形する関数
 * 公開ステータスの記事のみを返す
 */
export async function getArticles() {
  const files = import.meta.glob('/content/*.md', { as: 'raw' });
  const articles = [];

  for (const path in files) {
    const slug = path.split('/').pop().replace('.md', '');
    const rawContent = await files[path]();
    const { data, content } = matter(rawContent);

    // 公開以外は除外（draft、非公開など）
    if (data.status !== '公開') continue;

    articles.push({
      ...data,
      slug,
      content,
    });
  }

  // 新しい日付順にソート（更新日がある場合はそちら優先）
  return articles.sort((a, b) => {
    const dateA = new Date(a.updated || a.date);
    const dateB = new Date(b.updated || b.date);
    return dateB - dateA;
  });
}
