<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<svelte:head>
  <!-- 検索避け -->
  <meta name="robots" content="noindex, nofollow" />

  <!-- OGP無効化 -->
  <meta property="og:title" content="no-title" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="" />
  <meta property="og:description" content="This page is private." />
  <meta name="twitter:card" content="none" />
</svelte:head>

<slot />
