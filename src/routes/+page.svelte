<!-- src/routes/+page.svelte -->
<script>
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { getArticles } from '$lib/utils/articleUtils';

  // 仮のデータ取得関数（実際には content/ 配下をスキャン）
  const allArticles = await getArticles();

  const popularArticles = allArticles.slice(0, 4); // 今は先頭を仮で人気記事扱い
  const recentArticles = allArticles.slice(-4).reverse(); // 末尾4件を最新とする
</script>

<section class="intro">
  <h2>はじめに</h2>
  <p>このサイトは、デザイン（UIUX）に関連する情報をまとめたサイトです。業務外の時間に作成したものです。</p>
</section>

<section class="section">
  <h2>閲覧頻度が高いページ</h2>
  <div class="grid">
    {#each popularArticles as article}
      <ArticleCard {article} />
    {/each}
  </div>
</section>

<section class="section">
  <h2>最近追加したページ</h2>
  <div class="grid">
    {#each recentArticles as article}
      <ArticleCard {article} />
    {/each}
  </div>
</section>

<style>
  .intro {
    background: #f3f3f3;
    padding: 2rem;
    margin-bottom: 2rem;
    border-radius: 12px;
  }

  .intro h2 {
    margin-top: 0;
  }

  .section {
    margin-bottom: 3rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
</style>
