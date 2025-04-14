// src/routes/category/[category]/+page.svelte

<script>
  import { error } from '@sveltejs/kit';
  import fs from 'fs';
  import path from 'path';
  import matter from 'gray-matter';
  import ArticleCard from '$lib/ArticleCard.svelte';

  export async function load({ params }) {
    const { category } = params;
    const directory = 'content';
    const files = fs.readdirSync(directory);

    const articles = files
      .map((file) => {
        const fullPath = path.join(directory, file);
        const content = fs.readFileSync(fullPath, 'utf-8');
        const { data } = matter(content);
        return {
          ...data,
          slug: file.replace(/\.md$/, '')
        };
      })
      .filter((article) => article.category === category);

    if (articles.length === 0) {
      throw error(404, 'カテゴリが見つかりません');
    }

    return { category, articles };
  }
</script>

<h1>{category} の記事</h1>
<div class="grid">
  {#each articles as article}
    <ArticleCard {article} />
  {/each}
</div>

<style>
  h1 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }
</style>
