<script>
  import "../styles/global.css";

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
  <!-- 検索避け & OGP無効化 -->
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
      <ul>
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
      <form action="/search">
        <input type="text" name="q" placeholder="キーワードを入力" />
      </form>
    </nav>
  </aside>
  <main class="content">
    <slot />
  </main>
</div>

<style>
  .layout {
    display: flex;
    background-color: #f7f7f5;
    min-height: 100vh;
  }
  .sidebar {
    width: 240px;
    padding: 2rem;
    background-color: #f9f8f6;
    border-right: 1px solid #eee;
  }
  .sidebar h1 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
  .sidebar .label {
    font-weight: bold;
    font-size: 0.95rem;
    margin: 1rem 0 0.5rem;
    color: #444;
  }
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  .sidebar li {
    margin-bottom: 0.8rem;
  }
  .sidebar a {
    color: #333;
    text-decoration: none;
    padding: 4px 8px;
    border-radius: 4px;
    display: inline-block;
  }
  .sidebar a:hover {
    background-color: #f0f0f0;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 1rem;
  }
  .tag {
    background-color: #f1f1f1;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.8rem;
    color: #333;
    text-decoration: none;
  }
  .tag:hover {
    background-color: #e0e0e0;
  }
  .content {
    flex-grow: 1;
    padding: 2rem;
  }
</style>
