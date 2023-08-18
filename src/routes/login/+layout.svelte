<script lang="ts">
  import { page } from '$app/stores'
  import { user, userData } from '$lib/firebase'
  import { fly } from 'svelte/transition'

  $user
  $userData
</script>

<nav class="text-xl">
  <ul class="steps">
    <a href="/login" class="step step-primary"> Login </a>
    <a href="/login/username" class="step" class:step-primary={$page.route.id?.match(/username|photo/g)}> Username </a>
    <a href="/login/photo" class="step" class:step-primary={$page.route.id?.includes('photo')}>Photo</a>
  </ul>
</nav>

{#key $page.url}
  <div in:fly={{ x: '-100%', duration: 500 }} class="w-full flex justify-center">
    <main class="w-[90%] flex items-center justify-center py-8 rounded-2xl bg-slate-800 my-10">
      <div>
        <slot />
      </div>
    </main>
  </div>
{/key}

<style lang="postcss">
  div :global(h1) {
    @apply text-5xl font-bold;
  }
</style>
