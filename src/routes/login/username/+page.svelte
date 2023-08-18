<script lang="ts">
  import { db, user } from '$lib/firebase'
  import AuthCheck from '$lib/components/AuthCheck.svelte'
  import { doc, getDoc, writeBatch } from 'firebase/firestore'

  let username = ''
  let loading = false
  let isAvailable = false
  let debounceTimer: NodeJS.Timeout

  const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/
  $: isValid = username.length > 2 && username.length < 16 && re.test(username)

  async function checkAvailability() {
    isAvailable = true
    loading = true

    if (username === '') {
      loading = false
      isAvailable = false
      return
    }

    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(async () => {
      const ref = doc(db, 'usernames', username)
      const exists = await getDoc(ref).then((doc) => doc.exists())
      isAvailable = !exists
      loading = false
    }, 500)
  }

  async function confirmUsername() {
    if (!isValid || !isAvailable) {
      return
    }

    const batch = writeBatch(db)
    batch.set(doc(db, 'usernames', username), { uid: $user?.uid })
    batch.set(doc(db, 'users', $user!.uid), {
      username,
      photoURL: $user?.photoURL ?? null,
      published: true,
      bio: 'I am the Walrus',
      links: [
        {
          title: 'Test Link',
          url: 'https://kung.foo',
          icon: 'custom',
        },
      ],
    })

    await batch.commit()
  }
</script>

<AuthCheck>
  <div class="flex flex-col items-center gap-10">
    <h1>Username</h1>
    <form on:submit|preventDefault={confirmUsername} class="flex flex-col items-center gap-4">
      <input type="text" placeholder="Username" bind:value={username} on:input={checkAvailability} class="input" class:input-error={!isValid} />
      {#if isAvailable && !loading}
        <p class="text-green-500">Username available!</p>
      {:else if !isAvailable && !loading}
        <p class="text-red-500">Username not available! Try a different one.</p>
      {:else}
        <p>Loading..</p>
      {/if}
      <button class="btn btn-success"> Confirm username @{username} </button>
    </form>
  </div>
</AuthCheck>
