<script>
  import { onMount } from 'svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { getArticles } from '$lib/utils/articleUtils';

  let articles = [];
  let statusFilter = "all"; // "all", "published", "draft"

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

<div class="layout">
  <aside class="sidebar">
    <h1><a href="/">デザインWiki</a></h1>
    <p class="label">ステータスで絞り込み</p>
    <select bind:value={statusFilter}>
      <option value="all">すべて</option>
      <option value="published">公開</option>
      <option value="draft">下書き</option>
    </select>
  </aside>

  <main class="content">
    <h2>検索結果</h2>
    <div class="grid">
      {#each filteredArticles as article}
        <ArticleCard {article} />
      {/each}
    </div>
  </main>
</div>

<style>
  .layout {
    display: flex;
    background-color: #f7f6f3;
    min-height: 100vh;
  }

  .sidebar {
    width: 240px;
    padding: 2rem 1rem 1rem;
    background-color: #f7f6f3;
    border-right: 1px solid #eee;
  }

  .sidebar h1 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .label {
    font-weight: 500;
    font-size: 0.75rem;
    color: #999;
    margin-bottom: 0.4rem;
  }

  select {
    width: 100%;
    padding: 6px 10px;
    font-size: 0.85rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  .content {
    flex-grow: 1;
    padding: 2rem;
    background-color: #ffffff;
    box-sizing: border-box;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
</style>
