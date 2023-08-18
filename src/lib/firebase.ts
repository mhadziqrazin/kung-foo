// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app'
import { doc, getFirestore, onSnapshot } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { derived, writable, type Readable } from 'svelte/store'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeVZ9lCHRmGmVqdYCe3CmComuTKO3zaAU",
  authDomain: "kung-foo-e3fe8.firebaseapp.com",
  projectId: "kung-foo-e3fe8",
  storageBucket: "kung-foo-e3fe8.appspot.com",
  messagingSenderId: "575730105147",
  appId: "1:575730105147:web:04ef3ea36919834991151e"
}

// Initialize Firebase
if (!getApps.length) {
  initializeApp(firebaseConfig)
}
export const db = getFirestore()
export const auth = getAuth()
export const storage = getStorage()

function userStore() {
  let unsubscribe: () => void
  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser')
    const { subscribe } = writable<User | null>(null)
    return {
      subscribe
    }
  }

  const { subscribe } = writable(auth.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user)
    })

    return () => unsubscribe()
  })

  return {
    subscribe
  }
}

export const user = userStore()

export function docStore<T>(path: string) {
  let unsubscribe: () => void

  const docRef = doc(db, path)

  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null)
    })

    return () => unsubscribe()
  })

  return {
    subscribe,
    ref: docRef,
    id: docRef.id
  }
}

export interface UserData {
  username: string
  bio: string
  photoUrl: string
  links: any[]
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
  if ($user) {
    return docStore<UserData>(`users/${$user.uid}`).subscribe(set)
  } else {
    set(null)
  }
})
