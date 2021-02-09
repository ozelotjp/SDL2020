<template>
  <div type="error" v-text="`[${error.statusCode}] ${error.message}`" />
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'

export default defineComponent({
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
})
</script>
