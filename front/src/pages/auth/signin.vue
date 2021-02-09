<template>
  <div class="text-center mt-20">
    <div class="w-full max-w-xs mx-auto pt-5">
      <h1 class="font-bold mb-5 text-lg">Sign In</h1>
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            メールアドレス
          </label>
          <input
            id="username"
            v-model="form.email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="example@example.com"
            required
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            パスワード
          </label>
          <input
            id="password"
            v-model="form.password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="******"
            required
          />
        </div>
        <div class="block text-center">
          <button
            class="p-2 bg-yellow-0 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="signIn"
          >
            Sign In
          </button>
        </div>
        <nuxt-link
          class="block mt-2 align-baseline font-bold text-sm text-blue-600 w-full"
          to="#"
        >
          パスワードを忘れましたか？
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from 'nuxt-composition-api'
import { authenticatedStore } from '@/store'

export default defineComponent({
  setup(_, { root: { $firebase, $router } }) {
    onBeforeMount(() => {
      $firebase.auth().onAuthStateChanged((user) => {
        if (user !== null) {
          $router.push(authenticatedStore.nextUrl)
        }
      })
    })

    const form = reactive({
      email: 'aaa@example.test',
      password: 'password',
    })

    const signIn = () => {
      $firebase.auth().signInWithEmailAndPassword(form.email, form.password)
    }

    return {
      form,
      signIn,
    }
  },
})
</script>
