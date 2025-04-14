<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { getArticles } from '$lib/utils/articleUtils';

  let articles = [];
  $: category = $page.params.category;

  onMount(async () => {
    const all = await getArticles();
    // "公開" のみ表示
    articles = all.filter(a => a.category === category && a.status === "公開");
  });
</script>

<h2>{category} の記事一覧</h2>

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
