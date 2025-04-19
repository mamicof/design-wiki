<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { getArticles } from '$lib/utils/articleUtils';

  let articles = [];
  let filteredArticles = [];
  $: tag = $page.params.tag;

  onMount(async () => {
    const all = await getArticles();

    // タグ名を小文字＆トリミングして比較
    filteredArticles = all.filter(a => {
      if (!Array.isArray(a.tags)) return false;
      return a.tags.some(t => t.trim().toLowerCase() === tag.trim().toLowerCase());
    });
  });
</script>

<h2>タグ「{tag}」の記事一覧</h2>

{#if filteredArticles.length === 0}
  <p>該当する記事はありません。</p>
{:else}
  <div class="grid">
    {#each filteredArticles as article}
      <ArticleCard {article} />
    {/each}
  </div>
{/if}

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
</style>
