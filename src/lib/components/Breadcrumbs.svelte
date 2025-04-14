<script>
  import { page } from '$app/stores';
  $: segments = $page.url.pathname.split('/').filter(Boolean);
</script>

<nav class="breadcrumbs">
  <a href="/">TOP</a>
  {#each segments as segment, i}
    <span class="separator">›</span>
    <a href={"/" + segments.slice(0, i + 1).join("/")}>{segment}</a>
  {/each}
</nav>