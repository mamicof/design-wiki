<!-- src/routes/+layout.svelte -->
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
    <div class="sidebar-header">デザインWiki</div>
    <nav class="nav">
      <a href="/" class="nav-link">TOP</a>
      <a href="/about" class="nav-link">概要</a>
      <a href="/tags" class="nav-link">タグ一覧</a>
      <a href="/search" class="nav-link">検索</a>
    </nav>
  </aside>

  <main class="main">
    <slot />
  </main>
</div>
