<!-- src/routes/tags/[tag]/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  export let data;
  let tag = '';
  let articles = [];

  $: tag = $page.params.tag;

  // ダミーデータ（実際は CMS から取得するなどに変更）
  const allArticles = [
    { title: 'UIの基本', tags: ['UI', '基礎'], href: '/articles/ui-basics' },
    { title: 'アクセシビリティ改善', tags: ['アクセシビリティ'], href: '/articles/a11y' },
    { title: 'UXとは', tags: ['UX'], href: '/articles/what-is-ux' },
  ];

  onMount(() => {
    articles = allArticles.filter(a => a.tags.includes(tag));
    if (articles.length === 0) goto('/tags'); // 該当記事なし→タグ一覧にリダイレクト
  });
</script>

<h1>タグ: {tag}</h1>

<ul>
  {#each articles as article}
    <li><a href={article.href}>{article.title}</a></li>
  {/each}
</ul>
