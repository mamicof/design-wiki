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

<slot />
