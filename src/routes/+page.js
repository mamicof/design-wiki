// src/routes/+page.js
import { getArticles } from '$lib/utils/articleUtils';

export async function load() {
  const allArticles = await getArticles();
  const published = allArticles.filter(a => a.status === '公開');
  const popularArticles = published.slice(0, 4);
  const recentArticles = published.slice(-4).reverse();

  return {
    popularArticles,
    recentArticles
  };
}
