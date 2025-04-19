// src/routes/tags/[tag]/+page.js
import { getArticles } from '$lib/utils/articleUtils';

export async function load({ params }) {
  const all = await getArticles();

  // normalize関数でタグ名の揺れを吸収
  const normalize = (str) => str?.normalize('NFKC').trim().toLowerCase();
  const normalizedTag = normalize(params.tag);

  const filtered = all.filter(article => {
    return Array.isArray(article.tags) &&
      article.tags.some(t => normalize(t) === normalizedTag);
  });

  return {
    tag: params.tag,
    articles: filtered
  };
}
