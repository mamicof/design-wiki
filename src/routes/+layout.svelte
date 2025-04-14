// src/routes/+layout.svelte
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
        <li><a href="/overview">概要</a></li>
        <li><a href="/tags">タグ一覧</a></li>
        <li><a href="/search">検索</a></li>
      </ul>
    </nav>
  </aside>
  <main class="content">
    <slot />
  </main>
</div>
