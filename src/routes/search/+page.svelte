<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { getArticles } from '$lib/utils/articleUtils';

  let query = '';
  let articles = [];

  $: query = $page.url.searchParams.get('q') || '';

  onMount(async () => {
    const all = await getArticles();
    articles = all.filter(a =>
      a.title.includes(query) ||
      (a.tags && a.tags.some(tag => tag.includes(query))) ||
      (a.content && a.content.includes(query))
    );
  });
</script>

<h1>検索: {query}</h1>
<div class="grid">
  {#if articles.length === 0}
    <p>該当する記事が見つかりませんでした。</p>
  {:else}
    {#each articles as article}
      <ArticleCard {article} />
    {/each}
  {/if}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
</style>
