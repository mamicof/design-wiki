<!-- src/lib/components/ArticleCard.svelte -->
<script>
  export let article;
  import { tagColorMap } from '$lib/utils/tagColorMap.js';
</script>

<a class="card" href={article.url}>
  {#if article.image}
    <img class="thumb" src={article.image} alt={article.title} />
  {/if}
  <div class="card-content">
    <h2>{article.emoji} {article.title}</h2>
    <div class="tags">
      {#each article.tags as tag}
        <span class={"tag " + (tagColorMap[tag] || 'tag--gray')}>{tag}</span>
      {/each}
      {#if article.category}
        <span class="tag category">{article.category}</span>
      {/if}
    </div>
  </div>
</a>

<style>
  .card {
    display: block;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
    text-decoration: none;
    color: inherit;
    transition: transform 0.15s ease;
  }

  .card:hover {
    transform: translateY(-2px);
  }

  .thumb {
    width: 100%;
    height: 140px;
    object-fit: cover;
  }

  .card-content {
    padding: 1rem;
  }

  h2 {
    font-size: 1rem;
    margin: 0 0 0.5rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.
