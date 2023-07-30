<script lang="ts">
  import { db } from '$lib/firebase'
  import AuthCheck from '$lib/components/AuthCheck.svelte'
  import { doc, getDoc } from 'firebase/firestore'

  let username = ''
  let loading = false
  let isAvailable = false
  let debounceTimer: NodeJS.Timeout

  async function checkAvailability() {
    isAvailable = true
    loading = true

    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(async () => {
      const ref = doc(db, 'usernames', username)
      const exists = await getDoc(ref).then((doc) => doc.exists())

      isAvailable = !exists
      loading = false
    }, 500)
  }

  async function confirmUsername() {}
</script>

<AuthCheck>
  <div class="flex flex-col items-center gap-10">
    <h1>Username</h1>
    <form on:submit|preventDefault={confirmUsername} class="flex flex-col items-center gap-4">
      <input type="text" placeholder="Username" bind:value={username} on:input={checkAvailability} class="input" />
      {#if isAvailable}
        <p>Username available!</p>
      {:else}
        <p>Username not available! Try a different one.</p>
      {/if}
      <button class="btn btn-success"> Confirm username @{username} </button>
    </form>
  </div>
</AuthCheck>
