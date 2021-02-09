<template>
  <div class="text-center mt-20">
    <div class="w-full max-w-xs mx-auto pt-5">
      <h1 class="font-bold mb-5 text-lg">{{ group.name }}</h1>
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <p class="block text-gray-700 text-sm font-bold mb-2">
            メンバー
          </p>
          <table>
            <tr v-for="(carName, carId) in group.carsName" :key="carId">
              <td
                class="text-left pr-2"
                v-text="group.parent === carId ? '🦆' : '・'"
              />
              <td class="text-left" v-text="carName" />
            </tr>
          </table>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="link">
            リンクをコピーして招待
          </label>
          <input
            id="link"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :value="`https://example.com/group/${groupId}/invite`"
            type="text"
            readonly
            @focus="copyLink"
          />
        </div>
        <div>
          <nuxt-link
            class="inline-block w-48 mt-5 p-2 bg-yellow-0 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            :to="`/group/${groupId}/map`"
          >
            ドライブ
          </nuxt-link>
        </div>
        <div>
          <nuxt-link
            class="inline-block w-24 mt-5 p-2 bg-blue-600 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            :to="`/group/${groupId}/edit`"
          >
            編集
          </nuxt-link>
          <nuxt-link
            class="inline-block w-24 mt-5 p-2 bg-blue-600 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            to="/group"
          >
            一覧へ戻る
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'nuxt-composition-api'
import { Group, HasId } from '@@/models/firestore'

export default defineComponent({
  middleware: 'authenticated',
  setup(_, { root: { $firebase, $nuxt, $route } }) {
    const groupId = $route.params.groupId
    const group = ref({} as Group & HasId)

    onBeforeMount(() => {
      $firebase
        .firestore()
        .collection('groups')
        .doc(groupId)
        .get()
        .then((groupSnap) => {
          if (groupSnap.exists === false) {
            $nuxt.error({ statusCode: 404 })
            return
          }
          group.value = {
            ...groupSnap.data(),
            id: groupSnap.id,
          } as Group & HasId
        })
    })

    const copyLink = () => {
      const element = document.querySelector('#link') as HTMLInputElement
      element.select()
      document.execCommand('copy')
    }

    return {
      groupId,
      group,
      copyLink,
    }
  },
})
</script>
