<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { getArticles } from '$lib/utils/articleUtils';

  let tag = '';
  let articles = [];

  $: tag = $page.params.tag;

  onMount(async () => {
    const all = await getArticles();
    articles = all.filter(
      a => a.status === '公開' && a.tags?.includes(tag)
    );
  });
</script>

<div class="layout">
  <aside class="sidebar">
    <h1><a href="/">デザインWiki</a></h1>
    <p class="label">タグ: {tag}</p>
  </aside>

  <main class="content">
    <h2>「{tag}」のタグがついた記事</h2>

    {#if articles.length === 0}
      <p>該当する記事が見つかりませんでした。</p>
    {:else}
      <div class="grid">
        {#each articles as article}
          <ArticleCard {article} />
        {/each}
      </div>
    {/if}
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
    font-size: 0.85rem;
    color: #999;
    margin-bottom: 1rem;
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
    margin-top: 1rem;
  }
</style>
