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
    gap: 0.25em;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 6px;
  }

  .tag {
    font-size: 0.75rem;
    border-radius: 6px;
    padding: 2px 8px;
    color: #333;
    background-color: #eaeaea;
  }

  .tag.category {
    background-color: #f5e5db;
    color: #503c3c;
    font-weight: bold;
  }

  /* タグカラー：カスタムカラー対応 */
  .tag--yellow { background-color: #fff3b0; color: #664d00; }
  .tag--teal { background-color: #b2f5ea; color: #005e5e; }
  .tag--blue { background-color: #bee3f8; color: #2a4365; }
  .tag--green { background-color: #c6f6d5; color: #22543d; }
  .tag--red { background-color: #fed7d7; color: #742a2a; }
  .tag--orange { background-color: #fbd38d; color: #7b341e; }
  .tag--pink { background-color: #fbb6ce; color: #702459; }
  .tag--purple { background-color: #e9d8fd; color: #553c9a; }
  .tag--brown { background-color: #e8d8c3; color: #5c3b1c; }
  .tag--gray { background-color: #e2e8f0; color: #2d3748; }
</style>
