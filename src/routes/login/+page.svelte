<script lang="ts">
  import { auth } from '$lib/firebase'
  import { redirect } from '@sveltejs/kit'
  import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    const user = await signInWithPopup(auth, provider)
    console.log(user)
  }
</script>

<div class="flex flex-col items-center gap-10">
  <h1>
    {'Login'}
  </h1>
  <button class="btn btn-primary" on:click={handleSignIn}>
    {'Sign in with Google'}
  </button>
</div>
