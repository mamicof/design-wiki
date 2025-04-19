<!-- src/routes/search/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { getArticles } from '$lib/utils/articleUtils';

  let articles = [];
  let statusFilter = "all";

  onMount(async () => {
    articles = await getArticles();
  });

  function filterByStatus(article) {
    if (statusFilter === "all") return true;
    if (statusFilter === "published") return article.status === "公開";
    if (statusFilter === "draft") return article.status === "下書き";
    return true;
  }

  $: filteredArticles = articles.filter(filterByStatus);
</script>

<main class="content">
  <h2>検索結果</h2>

  <div class="filter-controls">
    <label class="label">ステータスで絞り込み</label>
    <select bind:value={statusFilter}>
      <option value="all">すべて</option>
      <option value="published">公開</option>
      <option value="draft">下書き</option>
    </select>
  </div>

  {#if filteredArticles.length === 0}
    <p>該当する記事は見つかりませんでした。</p>
  {:else}
    <div class="grid">
      {#each filteredArticles as article}
        <ArticleCard {article} />
      {/each}
    </div>
  {/if}
</main>

<style>
  .content {
    flex-grow: 1;
    padding: 2rem;
    background-color: #ffffff;
    box-sizing: border-box;
  }

  h2 {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .filter-controls {
    margin-bottom: 1.5rem;
  }

  .label {
    font-weight: 500;
    font-size: 0.85rem;
    color: #555;
    margin-bottom: 0.4rem;
    display: block;
  }

  select {
    width: 100%;
    max-width: 240px;
    padding: 6px 10px;
    font-size: 0.85rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
</style>
