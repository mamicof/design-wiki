<!-- src/routes/search/+page.svelte -->
<script>
  let keyword = '';
  let results = [];

  const allArticles = [
    { title: 'UIの基本', href: '/articles/ui-basics' },
    { title: 'アクセシビリティ改善', href: '/articles/a11y' },
    { title: 'UXとは', href: '/articles/what-is-ux' },
  ];

  const search = () => {
    if (!keyword.trim()) {
      results = [];
      return;
    }
    results = allArticles.filter(article =>
      article.title.toLowerCase().includes(keyword.toLowerCase())
    );
  };
</script>

<h1>検索</h1>

<input
  type="text"
  bind:value={keyword}
  placeholder="キーワードを入力"
  on:input={search}
/>

{#if results.length > 0}
  <ul>
    {#each results as result}
      <li><a href={result.href}>{result.title}</a></li>
    {/each}
  </ul>
{:else if keyword}
  <p>該当する記事が見つかりませんでした。</p>
{/if}
