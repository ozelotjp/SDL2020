<template>
  <div>
    please wait...
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'nuxt-composition-api'

export default defineComponent({
  middleware: 'authenticated',
  setup(_, { root: { $firebase, $router } }) {
    onBeforeMount(() => {
      $firebase
        .auth()
        .signOut()
        .then(() => {
          $router.push('/')
        })
    })
  },
})
</script>
