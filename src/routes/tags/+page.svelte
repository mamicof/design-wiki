<script>
  let tags = ["UI", "UX", "アクセシビリティ", "デザインシステム"];
</script>

<h1>タグ一覧</h1>
<ul>
  {#each tags as tag}
    <li><a href={"/tags/" + tag}>{tag}</a></li>
  {/each}
</ul>