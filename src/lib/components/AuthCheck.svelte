<script lang="ts">
  import { user } from '$lib/firebase'
</script>

{#if $user}
  <slot />
{:else}
  <p class="text-error">
    You must be signed in to view this page.
    <a class="text-purple-500 underline hover:no-underline hover:text-purple-300" href="/login">Sign in</a>
  </p>
{/if}
