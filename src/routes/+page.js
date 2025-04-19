// src/routes/+page.js
import { getArticles } from '$lib/utils/articleUtils';

export async function load() {
  const allArticles = await getArticles();

  const published = allArticles.filter(article => article.status === '公開');

  // 日付でソート（降順：新しい順）
  const sorted = published.sort((a, b) => new Date(b.date) - new Date(a.date));

  // よくアクセスされる記事（人気記事）: 今は仮で先頭4件を使用（今後アクセス数ベースに差し替え可能）
  const popularArticles = sorted.slice(0, 4);

  // 最近追加された記事（最大4件）
  const recentArticles = sorted.slice(0, 4); // ソート済なのでこれでOK

  return {
    popularArticles,
    recentArticles
  };
}
