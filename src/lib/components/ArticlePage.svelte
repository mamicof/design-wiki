<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { getArticleBySlug } from '$lib/utils/articleUtils';
  import { marked } from 'marked';

  export let data;
  const { slug } = data;
  let html = '';
  let toc = [];

  function generateTOC(tokens) {
    const tocList = [];
    tokens.forEach((token) => {
      if (token.type === 'heading' && token.depth <= 3) {
        const id = token.text.toLowerCase().replace(/\s+/g, '-');
        tocList.push({ text: token.text, id, depth: token.depth });
        token.text = `<a id="${id}">${token.text}</a>`;
      }
    });
    return tocList;
  }

  onMount(async () => {
    const article = await getArticleBySlug(slug);
    const tokens = marked.lexer(article.body);
    toc = generateTOC(tokens);
    html = marked.parser(tokens);
  });
</script>

<div class="article-layout">
  <aside class="toc">
    <h2>目次</h2>
    <ul>
      {#each toc as item}
        <li class="depth-{item.depth}"><a href={`#${item.id}`}>{item.text}</a></li>
      {/each}
    </ul>
  </aside>

  <article class="content" bind:this={articleElement}>
    {@html html}
  </article>
</div>

<style>
  .article-layout {
    display: flex;
    gap: 2rem;
  }
  .toc {
    width: 240px;
    font-size: 0.85rem;
    background: #f9f9f9;
    padding: 1rem;
    border-radius: 8px;
  }
  .toc ul {
    list-style: none;
    padding-left: 0;
  }
  .toc li {
    margin: 0.3rem 0;
  }
  .depth-2 {
    margin-left: 1rem;
  }
  .depth-3 {
    margin-left: 2rem;
  }
  .content {
    flex: 1;
  }
</style>
