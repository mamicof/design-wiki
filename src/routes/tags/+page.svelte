<script>
  import tagData from '$lib/data/tagColorMap.yaml';
</script>

<h2>タグ一覧</h2>

<div class="tags">
  {#each tagData.tags as tag}
    <a class="tag {tag.class}" href={`/tags/${tag.name}`}>{tag.name}</a>
  {/each}
</div>

<style>
  h2 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag {
    padding: 4px 10px;
    font-size: 0.85rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 500;
  }

  /* 色は class によって tagColorMap.yaml と連動 */
</style>
