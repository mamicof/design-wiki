<script>
  import "../styles/global.css";
  import ArticleCard from '$lib/components/ArticleCard.svelte';

  export let data;
  const { popularArticles, recentArticles } = data;

  const categories = [
    "デザインシステム",
    "アクセシビリティ",
    "マーケティング",
    "SEO",
    "リサーチ",
    "ユーザビリティ",
    "エンジニアリング",
    "プロセス",
    "運用"
  ];

  const tags = [
    "色", "入力", "フォーム", "alt", "画面", "階層", "アコーディオン",
    "トグル", "モーダル", "UIパターン", "表記", "ABテスト", "検索避け",
    "画面数", "UX", "SEO", "リキャプチャ", "通知", "リンク", "FAB",
    "フォント", "カーニング", "ロゴ", "画像", "OGP", "コンポーネント",
    "ローディング", "スケルトン", "アイコン", "パンくず", "ユーザータイプ"
  ];
</script>

<svelte:head>
  <meta name="robots" content="noindex, nofollow" />
  <meta property="og:title" content="no-title" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="" />
  <meta property="og:description" content="This page is private." />
  <meta name="twitter:card" content="none" />
</svelte:head>

<div class="layout">
  <aside class="sidebar">
    <nav>
      <h1><a href="/">デザインWiki</a></h1>

      <p class="label">カテゴリ</p>
      <ul class="menu">
        {#each categories as category}
          <li><a href={"/category/" + category}>{category}</a></li>
        {/each}
      </ul>

      <p class="label">タグ</p>
      <div class="tags">
        {#each tags as tag}
          <a class="tag" href={"/tags/" + tag}>{tag}</a>
        {/each}
      </div>

      <p class="label">検索</p>
      <form action="/search" class="search-form">
        <input type="text" name="q" placeholder="検索キーワード" />
      </form>
    </nav>
  </aside>

  <main class="content">
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
  </main>
</div>

<style>
  .layout {
    display: flex;
    background-color: #ffffff;
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
    margin: 0 0 1.5rem 0;
    padding: 0;
  }
  .label {
    font-weight: 500;
    font-size: 0.75rem;
    color: #999;
    margin: 1rem 0 0.4rem;
  }
  .menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .menu li {
    margin-bottom: 0.4rem;
  }
  .menu a {
    font-size: 0.85rem;
    color: #333;
    text-decoration: none;
    padding: 4px 6px;
    border-radius: 4px;
    display: inline-block;
  }
  .menu a:hover {
    background-color: #eaeaea;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 1rem;
  }
  .tag {
    background-color: #eaeaea;
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 0.75rem;
    color: #333;
    text-decoration: none;
  }
  .tag:hover {
    background-color: #dcdcdc;
  }
  .search-form input[type="text"] {
    width: 100%;
    padding: 6px 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.85rem;
    background: #fff;
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
  }
  .content {
    flex-grow: 1;
    padding: 2rem;
    background-color: #ffffff;
  }
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
