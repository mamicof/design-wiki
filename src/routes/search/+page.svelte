<script>
  let statusFilter = "all"; // "all", "published", "draft"

  function filterByStatus(article) {
    if (statusFilter === "all") return true;
    if (statusFilter === "published") return article.status === "公開";
    if (statusFilter === "draft") return article.status === "下書き";
  }

  $: filteredArticles = paginatedArticles.filter(filterByStatus);
</script>

<div class="filter-controls">
  <label>
    <select bind:value={statusFilter}>
      <option value="all">すべて</option>
      <option value="published">公開</option>
      <option value="draft">下書き</option>
    </select>
  </label>
</div>

<div class="grid">
  {#each filteredArticles as article}
    <ArticleCard {article} />
  {/each}
</div>

<style>
  .filter-controls {
    margin: 1rem 0 1.5rem;
  }
  select {
    padding: 4px 10px;
    font-size: 0.9rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
</style>
