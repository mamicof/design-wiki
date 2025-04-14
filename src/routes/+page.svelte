<script>
  import "../styles/global.css";
  import ArticleCard from '$lib/components/ArticleCard.svelte';

  export let data;
  const { popularArticles, recentArticles } = data;

  const categories = [
    "デザインシステム", "アクセシビリティ", "マーケティング", "SEO", "リサーチ",
    "ユーザビリティ", "エンジニアリング", "プロセス", "運用"
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
  <meta property="og:title" content="デザインWikiサイト" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="" />
  <meta property="og:description" content="UIUXを中心とした、画面を持つシステム設計の知識をまとめたサイト。" />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<div class="layout">
  <aside class="sidebar">
    <nav>
      <h1><a href="/">デザインWikiサイト</a></h1>

      <form action="/search" class="search-form">
        <input type="text" name="q" placeholder="検索キーワード" />
      </form>

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
    </nav>
  </aside>

  <main class="content">
    <section class="intro">
      <h2>このサイトについて</h2>
      <p>
        このサイトはUIUXを中心とした、画面を持つシステムの設計に関する知識をまとめたサイトです。
        業務時間外に作成した趣味のサイトです。
      </p>
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
      <h2>最近追加した記事</h2>
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
    background-color: #f7f6f3 !important;
    border-right: 1px solid #eee;
  }

  .sidebar h1 {
    font-size: 1.1rem;
    margin: 0 0 1rem 0;
  }

  .search-form {
    margin-bottom: 1.5rem;
  }

  .search-form input[type="text"] {
    width: 100%;
    padding: 6px 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.85rem;
    background: #fff;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
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

  .section {
    margin-bottom: 3rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
</style>
