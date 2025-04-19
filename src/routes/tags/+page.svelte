<!-- src/routes/tags/+page.svelte -->
<script>
  import { tagColorMap } from '$lib/data/tagColorMap.js';
</script>

<h2>タグ一覧</h2>

<div class="tags">
  {#each Object.entries(tagColorMap) as [name, className]}
    <a
      class="tag {className}"
      href={`/tags/${encodeURIComponent(name)}`}
    >
      {name}
    </a>
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
    display: inline-block;
    transition: background-color 0.2s ease;
  }

  .tag:hover {
    opacity: 0.9;
  }

</style>
