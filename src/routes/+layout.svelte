<script>
  import "../styles/global.css";
  import { onMount } from 'svelte';
  import { getCategoriesAndTags } from '$lib/utils/articleUtils.js';

  let categories = [];
  let tags = [];

  onMount(async () => {
    const data = await getCategoriesAndTags();
    categories = data.categories;
    tags = data.tags;
  });
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
      <div class="nav-link-group">
        <a class="menu-link title" href="/">デザインWiki</a>
      </div>

      <form action="/search" class="search-form">
        <input type="text" name="q" placeholder="検索..." />
      </form>

      <p class="label">カテゴリ</p>
      <ul class="menu">
        {#each categories as category}
          <li><a class="menu-link" href={"/category/" + encodeURIComponent(category)}>{category}</a></li>
        {/each}
      </ul>

      <p class="label">タグ</p>
      <div class="tags">
        {#each tags as tag}
          <a class="tag" href={"/tags/" + encodeURIComponent(tag)}>{tag}</a>
        {/each}
      </div>
    </nav>
  </aside>

  <main class="content">
    <slot />
  </main>
</div>

<style>
  .layout {
    display: flex;
    background-color: #f7f6f3;
    min-height: 100vh;
  }

  .sidebar {
    width: 240px;
    padding: 16px 8px 16px;
    background-color: #f9f8f6;
    box-sizing: border-box;
  }

  .nav-link-group {
    margin-bottom: 8px;
  }

  .title {
    font-weight: bold;
    font-size: 14px;
    display: block;
    padding: 4px 16px;
    height: 36px;
    line-height: 36px;
    border-radius: 6px;
    color: #333;
    text-decoration: none;
  }

  .title:hover {
    background-color: #ececec;
  }

  .search-form {
    padding: 0 16px;
    margin-bottom: 24px;
  }

  .search-form input[type="text"] {
    width: calc(100% - 2px);
    padding: 6px 10px;
    font-size: 13px;
    border-radius: 6px;
    border: 1px solid #ccc;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.04);
    background-color: #fff;
    box-sizing: border-box;
  }

  .label {
    font-size: 12px;
    color: #888;
    font-weight: bold;
    padding: 0 16px;
    height: 30px;
    line-height: 30px;
    margin-top: 20px;
  }

  .menu {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .menu li {
    margin: 0;
  }

  .menu-link {
    display: block;
    padding: 0 16px;
    margin: 0 8px;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    border-radius: 6px;
    text-decoration: none;
    color: #333;
    transition: background-color 0.2s ease;
  }

  .menu-link:hover {
    background-color: #ececec;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 0 16px;
    margin-top: 8px;
  }

  .tag {
    background-color: #eaeaea;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.75rem;
    text-decoration: none;
    color: #333;
    transition: background-color 0.2s ease;
  }

  .tag:hover {
    background-color: #dcdcdc;
  }

  .content {
    flex-grow: 1;
    background-color: #ffffff;
    padding: 2rem;
    box-sizing: border-box;
  }
</style>
