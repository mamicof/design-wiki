// src/routes/+page.js
import { getArticles } from '$lib/utils/articleUtils';

export async function load() {
  const allArticles = await getArticles();
  const popularArticles = allArticles.slice(0, 4);
  const recentArticles = allArticles.slice(-4).reverse();

  return {
    popularArticles,
    recentArticles
  };
}
