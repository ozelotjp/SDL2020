<template>
  <div>
    <header
      class="bg-yellow-0 bg-center w-full h-20 mb-5 fixed z-100 top-0 bg-no-repeat"
      style="
        background-image: url('https://i.imgur.com/BDRC5eR.png');
        background-size: auto 3rem;
      "
      @click="gotoIndex"
    ></header>
    <main class="mt-20">
      <nuxt />
    </main>
  </div>
</template>

<style>
.bg-yellow-0 {
  background-color: #eec000;
}
input[type='submit'],
input[type='button'] {
  border-radius: 0;
  -webkit-box-sizing: content-box;
  -webkit-appearance: none;
  appearance: none;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
}
input[type='submit']::-webkit-search-decoration,
input[type='button']::-webkit-search-decoration {
  display: none;
}
input[type='submit']:focus,
input[type='button']:focus {
  outline-offset: -2px;
}
</style>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'

export default defineComponent({
  setup(_, { root: { $router } }) {
    const gotoIndex = () => {
      $router.push('/')
    }

    return {
      gotoIndex,
    }
  },
})
</script>
