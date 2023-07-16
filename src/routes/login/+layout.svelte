<script lang="ts">
  import { page } from '$app/stores'
</script>

<div class="flex flex-col items-center w-full gap-10">
  <ul class="steps">
    <a href="/login" class="step step-primary">Login</a>
    <a href="/login/username" class="step" class:step-primary={$page.route.id?.match(/username|photo/g)}> Username </a>
    <a href="/login/photo" class="step" class:step-primary={$page.route.id?.includes('photo')}>Photo</a>
  </ul>

  <div class="w-[90%] flex items-center justify-center py-8 rounded-2xl bg-slate-800">
    <slot />
  </div>
</div>

<style lang="postcss">
  div :global(h1) {
    @apply text-5xl font-bold;
  }

  /* a {
    @apply p-4 rounded-full aspect-square w-16 grid place-content-center text-white bg-slate-800;
  } */
</style>
