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

  /* タグカラー定義 */
  .tag--yellow {
    background-color: #fff7cc;
    color: #665500;
  }

  .tag--teal {
    background-color: #ccf5f5;
    color: #005555;
  }

  .tag--blue {
    background-color: #ddeeff;
    color: #114488;
  }

  .tag--red {
    background-color: #ffe0e0;
    color: #a33;
  }

  .tag--green {
    background-color: #e6f4e6;
    color: #2b662b;
  }

  .tag--orange {
    background-color: #ffe9cc;
    color: #aa5500;
  }

  .tag--pink {
    background-color: #fce6f6;
    color: #994466;
  }

  .tag--gray {
    background-color: #e0e0e0;
    color: #444;
  }

  .tag--brown {
    background-color: #f3e6da;
    color: #5a3d2b;
  }

  .tag--purple {
    background-color: #efe6ff;
    color: #663399;
  }
</style>
