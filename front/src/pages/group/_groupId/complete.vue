<template>
  <div class="text-center mt-20">
    <div class="w-full max-w-xs mx-auto pt-5">
      <h1 class="font-bold mb-5 text-lg">グループ作成完了</h1>
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="link">
            リンクをコピーして招待
          </label>
          <input
            id="link"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            readonly
            :value="`https://example.com/group/${groupId}/invite`"
            @focus="copyLink"
          />
        </div>
        <div class="mb-4">
          <nuxt-link
            class="mt-5 p-2 bg-yellow-0 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            :to="`/group/${groupId}/display`"
          >
            グループ表示
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'

export default defineComponent({
  middleware: 'authenticated',
  setup(_, { root: { $route } }) {
    const groupId = $route.params.groupId

    const copyLink = () => {
      const element = document.querySelector('#link') as HTMLInputElement
      element.select()
      document.execCommand('copy')
    }

    return {
      groupId,
      copyLink,
    }
  },
})
</script>
