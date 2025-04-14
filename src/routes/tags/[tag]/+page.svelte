<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { getArticles } from '$lib/utils/articleUtils';

  let articles = [];
  $: tag = $page.params.tag;

  onMount(async () => {
    const all = await getArticles();
    articles = all.filter(a => a.tags?.includes(tag) && a.status === "公開");
  });
</script>

<h2>タグ「{tag}」の記事一覧</h2>

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
    margin-top: 1.5rem;
  }
</style>
