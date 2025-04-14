<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { getArticles } from '$lib/utils/articleUtils';

  let articles = [];
  $: category = $page.params.category;

  onMount(async () => {
    const all = await getArticles();
    articles = all.filter(a => a.category === category);
  });
</script>

<h1>カテゴリ: {category}</h1>
<div class="grid">
  {#each articles as article}
    <ArticleCard {article} />
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
</style>
