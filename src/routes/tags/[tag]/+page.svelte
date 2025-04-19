<!-- src/routes/tags/[tag]/+page.svelte -->
<script>
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  export let data;
  const { tag, articles } = data;
</script>

<h2>タグ「{tag}」の記事一覧</h2>

{#if articles.length === 0}
  <p>該当する記事はありません。</p>
{:else}
  <div class="grid">
    {#each articles as article}
      <ArticleCard {article} />
    {/each}
  </div>
{/if}

<style>
  h2 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
</style>
