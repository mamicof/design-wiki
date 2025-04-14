<!-- src/lib/ArticleCard.svelte -->
<script>
  export let article;
</script>

<a class="card" href={article.url}>
  {#if article.image}
    <img class="thumb" src={article.image} alt={article.title} />
  {/if}
  <div class="card-content">
    <h2>{article.emoji} {article.title}</h2>
    <div class="tags">
      {#each article.tags as tag}
        <span class="tag">{tag}</span>
      {/each}
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
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .tag {
    font-size: 0.75rem;
    background: #f2f2f2;
    border-radius: 6px;
    padding: 2px 8px;
    color: #333;
  }
</style>
