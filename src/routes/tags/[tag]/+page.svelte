<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { getArticles } from '$lib/utils/articleUtils';

  let filteredArticles = [];
  $: tag = $page.params.tag;

  onMount(async () => {
    const all = await getArticles();

    // 比較用に normalize + lowercase + trim
    const normalize = (str) => str?.normalize('NFKC').trim().toLowerCase();
    const normalizedTag = normalize(tag);

    filteredArticles = all.filter(article => {
      if (!Array.isArray(article.tags)) return false;
      return article.tags.some(t => normalize(t) === normalizedTag);
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
