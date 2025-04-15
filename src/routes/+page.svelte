<script>
  import "../styles/global.css";
  import ArticleCard from '$lib/components/ArticleCard.svelte';

  export let data;
  const { popularArticles, recentArticles } = data;
</script>

<main class="content">
  <section class="intro">
    <h2>このサイトについて</h2>
    <p>このサイトはUIUXを中心とした、画面を持つシステムの設計に関する知識をまとめたサイトです。業務時間外に作成した趣味のサイトです。</p>
  </section>

  <section class="section">
    <h2>よくアクセスされる記事</h2>
    <div class="grid">
      {#each popularArticles as article}
        <ArticleCard {article} />
      {/each}
    </div>
  </section>

  <section class="section">
    <h2>最近追加した記事</h
