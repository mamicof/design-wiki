<script>
  import "../styles/global.css";
  import ArticleCard from '$lib/components/ArticleCard.svelte';

  export let data;
  const { popularArticles, recentArticles } = data;
</script>

<main class="content">
  <section class="intro">
    <h2>このサイトについて</h2>
    <p>
      このサイトはUI/UXを中心とした、画面を持つシステムの設計に関する知識をまとめたWikiサイトです。  
      業務時間外に作成した趣味のサイトです。
    </p>
  </section>

  {#if popularArticles.length > 0}
    <section class="section">
      <h2>よくアクセスされる記事</h2>
      <div class="grid">
        {#each popularArticles as article}
          <ArticleCard {article} />
        {/each}
      </div>
    </section>
  {/if}

  {#if recentArticles.length > 0}
    <section class="section">
      <h2>最近追加した記事</h2>
      <div class="grid">
        {#each recentArticles as article}
          <ArticleCard {article} />
        {/each}
      </div>
    </section>
  {/if}
</main>

<style>
  .content {
    flex-grow: 1;
    padding: 2rem;
    background-color: #ffffff;
    box-sizing: border-box;
  }

  .intro {
    background: #f8f8f8;
    padding: 2rem;
    margin-bottom: 2.5rem;
    border-radius: 12px;
    line-height: 1.7;
    font-size: 15px;
  }

  .section {
    margin-bottom: 3rem;
  }

  .section h2 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    border-left: 4px solid #14b8a6;
    padding-left: 0.75rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
</style>
