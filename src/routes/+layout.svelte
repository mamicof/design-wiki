<script>
  import "../styles/global.css";
  import Breadcrumbs from '../lib/Breadcrumbs.svelte';
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
    <h1>デザインWiki</h1>
    <nav>
      <ul>
        <li><a href="/">TOP</a></li>
        <li><a href="/overview">概要</a></li>
        <li><a href="/tags">タグ一覧</a></li>
        <li><a href="/search">検索</a></li>
      </ul>
    </nav>
  </aside>
  <main class="content">
    <Breadcrumbs />
    <slot />
  </main>
</div>