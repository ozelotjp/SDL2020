<template>
  <div>
    <ul>
      <li v-for="(link, i) in links" :key="i">
        <nuxt-link :to="link" v-text="link" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'

export default defineComponent({
  middleware: 'authenticated',
  setup() {
    return {
      links: [
        '/auth/signin',
        '/auth/signout',
        '/group',
        '/setting/profile',
        '/setting/vin',
      ],
    }
  },
})
</script>
