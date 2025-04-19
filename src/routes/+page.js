// design-wiki/src/routes/+page.js
import { getArticles } from '$lib/utils/articleUtils';

export async function load() {
  const allArticles = await getArticles();

  // 日付でソート（降順：新しい順）
  const sorted = allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

  // よくアクセスされる記事（仮で先頭4件）
  const popularArticles = sorted.slice(0, 4);

  // 最近追加された記事（仮で最新4件）
  const recentArticles = sorted.slice(0, 4);

  return {
    popularArticles,
    recentArticles
  };
}
