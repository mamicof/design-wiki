<script>
  import "../styles/global.css";
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
      <h1>デザインWiki</h1>
      <ul>
        <li><a href="/">TOP</a></li>
        <li><a href="/articles">記事一覧</a></li>
        <li><a href="/tags">タグ一覧</a></li>
        <li><a href="/categories">カテゴリ一覧</a></li>
        <li><a href="/search">検索</a></li>
      </ul>
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
    background-color: #ffffff;
    border-right: 1px solid #eee;
  }
  .sidebar h1 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
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
  .content {
    flex-grow: 1;
    padding: 2rem;
  }
</style>
