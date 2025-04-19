// design-wiki/src/routes/tags/[tag]/+page.js
import { getArticles } from '$lib/utils/articleUtils';

export async function load({ params }) {
  const allArticles = await getArticles();

  const normalize = (str) => str?.normalize('NFKC').trim().toLowerCase();
  const targetTag = normalize(params.tag);

  const articles = allArticles.filter(article =>
    Array.isArray(article.tags) &&
    article.tags.some(tag => normalize(tag) === targetTag)
  );

  return {
    tag: params.tag,
    articles
  };
}
