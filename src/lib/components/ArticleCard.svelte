<script>
  export let article;
</script>

<a class="card" href={`/articles/${article.slug}`}>
  <div class="card-content">
    <div class="title-row">
      {#if article.emoji}
        <span class="emoji">{article.emoji}</span>
      {/if}
      <span class="title">{article.title}</span>
    </div>

    <div class="tags">
      {#each article.tags as tag}
        <span class="tag">{tag}</span>
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
    padding: 1rem;
    border-radius: 12px;
    border: 1px solid #eaeaea;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    text-decoration: none;
    transition: box-shadow 0.2s ease, transform 0.1s ease;
    color: #333;
  }

  .card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }

  .card-content {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.4;
  }

  .emoji {
    font-size: 1.2rem;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .tag {
    background-color: #f2f2f2;
    padding: 2px 8px;
    font-size: 0.7rem;
    border-radius: 6px;
    line-height: 1.4;
    color: #444;
  }

  .tag.category {
    font-weight: bold;
    background-color: #f5e5db;
    color: #503c3c;
  }
</style>
