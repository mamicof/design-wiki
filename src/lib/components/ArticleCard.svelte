<script>
  export let article;
</script>

<a class="card" href={`/articles/${article.slug}`}>
  <div class="card-title">
    {#if article.emoji}
      <span class="emoji">{article.emoji}</span>
    {/if}
    {article.title}
  </div>

  <div class="tag-row">
    {#each article.tags as tag}
      <span class="tag">{tag}</span>
    {/each}
    {#if article.category}
      <span class="tag category">{article.category}</span>
    {/if}
  </div>
</a>

<style>
  .card {
    display: block;
    padding: 1rem;
    max-width: 320px;
    border-radius: 12px;
    border: 1px solid #eee;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    text-decoration: none;
    transition: box-shadow 0.2s ease, transform 0.1s ease;
    color: #333;
  }

  .card:hover {
    box-shadow: 0 4px 10px rgba(0,0,0,0.06);
    transform: translateY(-2px);
  }

  .card-title {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.4rem;
    line-height: 1.4;
    color: #333;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .emoji {
    font-size: 1.2rem;
  }

  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .tag {
    font-size: 0.7rem;
    padding: 2px 8px;
    border-radius: 6px;
    background: #f1f1f1;
    color: #333;
  }

  .tag.category {
    font-weight: bold;
    background-color: #f5e5db;
    color: #503c3c;
  }
</style>
