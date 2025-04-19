<!-- src/routes/articles/[slug]/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { error } from '@sveltejs/kit';
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import { base } from '$app/paths';

  let article = null;
  let toc = [];
  $: slug = $page?.params?.slug || '';

  async function loadArticle(slug) {
    try {
      if (!slug) return;

      const indexRes = await fetch(`${base}/content/index.json`);
      if (!indexRes.ok) throw new Error(`index.json fetch failed: ${indexRes.status}`);
      const index = await indexRes.json();
      const item = index.find((a) => a.slug === slug);
      if (!item) throw error(404, '記事が見つかりません');

      const res = await fetch(`${base}${item.path}`);
      if (!res.ok) throw new Error(`markdown fetch failed: ${res.status}`);
      const text = await res.text();

      const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
      const match = text.match(frontmatterRegex);
      const rawMeta = match?.[1] || '';
      const body = text.replace(frontmatterRegex, '').trim();

      const data = {};
      for (const line of rawMeta.split('\n')) {
        const [key, ...rest] = line.split(':');
        const value = rest.join(':').trim();
        if (key === 'tags') {
          try {
            data.tags = JSON.parse(value);
          } catch {
            data.tags = value
              .replace(/^\[|\]$/g, '')
              .split(',')
              .map((t) => t.trim().replace(/^"|"$/g, ''));
          }
        } else {
          data[key.trim()] = value.replace(/^"|"$/g, '');
        }
      }

      const renderer = new marked.Renderer();
      renderer.heading = (text, level) => {
        if (level <= 3) {
          const id = text.toLowerCase().replace(/[^\w]+/g, '-');
          toc.push({ text, id, level });
          return `<h${level} id="${id}">${text}</h${level}>`;
        }
        return `<h${level}>${text}</h${level}>`;
      };

      const html = marked(body, { renderer });
      article = { ...data, content: html };
    } catch (err) {
      console.error('記事読み込みエラー:', err);
      article = null; // fallback にしてトップページ表示を妨げない
    }
  }

  onMount(() => {
    if (slug) loadArticle(slug);
  });
</script>

<svelte:head>
  <title>{article?.title || '記事'}</title>
</svelte:head>

{#if article}
<div class="article-layout">
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
{:else}
<p style="padding: 2rem; color: #666">記事が読み込まれていません。</p>
{/if}

<style>
  .article-layout {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    padding: 2rem;
    background: #fff;
  }

  .toc {
    width: 220px;
    font-size: 0.85rem;
    background: #f7f7f7;
    padding: 1rem;
    border-radius: 12px;
    height: fit-content;
    position: sticky;
    top: 2rem;
  }

  .toc h2 {
    font-size: 1rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  .toc ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .toc li {
    margin-bottom: 0.4rem;
    line-height: 1.4;
  }

  .toc-level-2 {
    margin-left: 1rem;
  }

  .toc-level-3 {
    margin-left: 2rem;
  }

  .article {
    flex-grow: 1;
    max-width: 800px;
  }

  .breadcrumbs {
    font-size: 0.85rem;
    margin-bottom: 1rem;
    color: #666;
  }

  .article h1 {
    font-size: 1.6rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  .meta {
    margin-top: 3rem;
    font-size: 0.8rem;
    color: #999;
    border-top: 1px solid #eee;
    padding-top: 1rem;
  }

  .article :global(h2) {
    margin-top: 2rem;
    font-size: 1.25rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.3rem;
  }

  .article :global(h3) {
    margin-top: 1.5rem;
    font-size: 1.1rem;
    color: #444;
  }

  .article :global(p) {
    margin-bottom: 1rem;
    line-height: 1.8;
  }

  .article :global(img) {
    max-width: 100%;
    border-radius: 6px;
    margin: 1rem 0;
  }
</style>
