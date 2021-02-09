<template>
  <div class="text-center mt-20">
    <div class="w-full max-w-xs mx-auto pt-5">
      <h1 class="font-bold mb-5 text-lg">HOME</h1>
      <div class="bg-white shadow-md rounded px-8 pt-1 pb-8 mb-4">
        <div class="text-left mb-4">
          <nuxt-link
            class="mt-5 p-2 mr-2 bg-yellow-0 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            to="/group/create"
          >
            新規作成
          </nuxt-link>
          <nuxt-link
            class="mt-5 p-2 bg-blue-600 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            to="/setting/profile"
          >
            プロフィール
          </nuxt-link>
        </div>
        <div class="mb-4">
          <table class="text-left w-full">
            <tr v-for="group in groups" :key="group.id">
              <td class="overflow-hidden w-3/4">
                <nuxt-link
                  class="w-full"
                  :to="`/group/${group.id}/display`"
                  v-text="group.name"
                />
              </td>
              <td>（{{ group.cars.length }}）</td>
            </tr>
          </table>
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
  setup(_, { root: { $firebase } }) {
    const groups = ref([] as (Group & HasId)[])

    onBeforeMount(async () => {
      const carsSnap = await $firebase
        .firestore()
        .collection('users')
        .doc($firebase.auth().currentUser!.uid)
        .collection('cars')
        .get()

      const carsData = carsSnap.docs.map((doc) => doc.id)

      $firebase
        .firestore()
        .collection('groups')
        .where(`cars`, 'array-contains', carsData[0])
        .orderBy('createdAt', 'desc')
        .get()
        .then((groupsSnap) => {
          groupsSnap.forEach((groupSnap) => {
            const data = {
              ...groupSnap.data(),
              id: groupSnap.id,
            } as Group & HasId
            groups.value.push(data)
          })
        })
    })

    return {
      groups,
    }
  },
})
</script>
