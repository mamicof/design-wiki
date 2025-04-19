// src/routes/+layout.js
import { getCategoriesAndTags } from '$lib/utils/articleUtils';

export async function load() {
  const { categories, tags } = await getCategoriesAndTags();

  return {
    categories,
    tags
  };
}
