<script lang="ts">
  import { auth, user } from '$lib/firebase'
  import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    const user = await signInWithPopup(auth, provider)
    console.log(user)
  }
</script>

<div class="flex flex-col items-center gap-10">
  <h1>Login</h1>

  {#if $user}
    <div class="flex flex-col items-center">
      <p>
        Hi, {$user.displayName}!
      </p>
      <p class="text-green-500">You are logged in</p>
    </div>
    <button class="btn btn-warning" on:click={() => signOut(auth)}> Sign out </button>
  {:else}
    <button class="btn btn-primary" on:click={handleSignIn}> Sign in with Google </button>
  {/if}
</div>
