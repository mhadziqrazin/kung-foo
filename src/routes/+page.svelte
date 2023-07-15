<script lang="ts">
  import type { PageData } from './$types'
  export let data: PageData
</script>

<h1 class="text-orange-500 font-extrabold text-5xl">SveltKit</h1>
<h2>
  {data.title}
</h2>
<p class="text-green-400">
  {data.text}
</p>
