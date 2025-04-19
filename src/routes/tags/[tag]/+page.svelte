<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { getArticles } from '$lib/utils/articleUtils';

  let all = [];
  let filteredArticles = [];
  $: tag = $page.params.tag;

  const normalize = (str) => str?.normalize('NFKC').trim().toLowerCase();

  onMount(async () => {
    all = await getArticles();
  });

  $: if (all.length > 0 && tag) {
    const normalizedTag = normalize(tag);
    filteredArticles = all.filter(article => {
      if (!Array.isArray(article.tags)) return false;
      return article.tags.some(t => normalize(t) === normalizedTag);
    });
  }
</script>

<h2>タグ「{tag}」の記事一覧</h2>

{#if filteredArticles.length === 0}
  <p>該当する記事はありません。</p>
  <pre style="font-size: 12px; color: #999;">
    tag = {tag}
    all tags = {JSON.stringify(all.map(a => a.tags), null, 2)}
  </pre>
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
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.2rem;
    margin-top: 1.5rem;
  }
</style>
