<script>
  let query = '';
</script>

<h1>検索</h1>
<input
  type="text"
  placeholder="検索ワードを入力"
  bind:value={query}
/>
<p>検索ワード: {query}</p>