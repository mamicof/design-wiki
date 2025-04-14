<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { getArticles } from '$lib/utils/articleUtils';
  import { goto } from '$app/navigation';

  let query = '';
  let articles = [];

  const ITEMS_PER_PAGE = 50;
  let currentPage = 1;
  let paginatedArticles = [];
  let totalPages = 1;

  $: query = $page.url.searchParams.get('q') || '';
  $: currentPage = parseInt($page.url.searchParams.get('page') || '1');
  $: updatePagination();

  async function updatePagination() {
    const all = await getArticles();
    articles = all.filter(a =>
      a.status !== 'draft' && (
        a.title.includes(query) ||
        (a.tags?.some(tag => tag.includes(query))) ||
        (a.content?.includes(query))
      )
    );

    totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    paginatedArticles = articles.slice(start, end);
  }

  function goToPage(n) {
    goto(`/search?q=${encodeURIComponent(query)}&page=${n}`);
  }
</script>

<h1>検索: {query}</h1>
{#if paginatedArticles.length === 0}
  <p>該当する記事が見つかりませんでした。</p>
{:else}
  <div class="grid">
    {#each paginatedArticles as article}
      <ArticleCard {article} />
    {/each}
  </div>

  {#if totalPages > 1}
    <div class="pagination">
      {#if currentPage > 1}
        <button on:click={() => goToPage(currentPage - 1)}>← 前へ</button>
      {/if}
      <span>ページ {currentPage} / {totalPages}</span>
      {#if currentPage < totalPages}
        <button on:click={() => goToPage(currentPage + 1)}>次へ →</button>
      {/if}
    </div>
  {/if}
{/if}

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;
    font-size: 0.95rem;
  }

  .pagination button {
    padding: 6px 12px;
    border: none;
    background: #eee;
    border-radius: 6px;
    cursor: pointer;
  }

  .pagination button:hover {
    background: #ddd;
  }
</style>
