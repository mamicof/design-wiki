<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { error } from '@sveltejs/kit';
  import fs from 'fs';
  import path from 'path';
  import matter from 'gray-matter';
  import { marked } from 'marked';

  let article = null;
  let toc = [];

  $: slug = $page.params.slug;

  onMount(() => {
    try {
      const filePath = path.resolve('content', `${slug}.md`);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      const renderer = new marked.Renderer();
      renderer.heading = (text, level) => {
        if (level <= 3) {
          const id = text.toLowerCase().replace(/[^\w]+/g, '-');
          toc.push({ text, id, level });
          return `<h${level} id="${id}">${text}</h${level}>`;
        }
        return `<h${level}>${text}</h${level}>`;
      };

      const html = marked(content, { renderer });
      article = { ...data, content: html };
    } catch (err) {
      throw error(404, '記事が見つかりません');
    }
  });
</script>

<svelte:head>
  <title>{article?.title || '記事'}</title>
</svelte:head>

<div class="layout">
  <aside class="toc">
    <h2>目次</h2>
    <ul>
      {#each toc as item}
        <li class={"toc-level-" + item.level}>
          <a href={"#" + item.id}>{item.text}</a>
        </li>
      {/each}
    </ul>
  </aside>

  <main class="article">
    <nav class="breadcrumbs">
      <a href="/">TOP</a> &gt; <a href="/articles">記事一覧</a> &gt; {article?.title}
    </nav>

    <h1>{article?.emoji} {article?.title}</h1>
    {@html article?.content}

    <footer class="meta">
      <p>公開日: {article?.date}</p>
      {#if article?.updated}
        <p>更新日: {article.updated}</p>
      {/if}
    </footer>
  </main>
</div>

<style>
  .layout {
    display: flex;
    gap: 2rem;
    padding: 2rem;
    background: #fff;
  }
  .toc {
    width: 200px;
    font-size: 0.9rem;
  }
  .toc h2 {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  .toc ul {
    list-style: none;
    padding: 0;
  }
  .toc li {
    margin-bottom: 0.5rem;
  }
  .toc-level-2 {
    margin-left: 1rem;
  }
  .toc-level-3 {
    margin-left: 2rem;
  }
  .article {
    flex: 1;
  }
  .breadcrumbs {
    font-size: 0.85rem;
    margin-bottom: 1rem;
    color: #666;
  }
  .meta {
    margin-top: 3rem;
    font-size: 0.8rem;
    color: #999;
  }
  h1 {
    margin-top: 0;
  }
</style>
