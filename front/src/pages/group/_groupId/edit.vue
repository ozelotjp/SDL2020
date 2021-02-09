<template>
  <div class="text-center mt-20">
    <div class="w-full max-w-xs mx-auto pt-5">
      <h1 class="font-bold mb-5 text-lg">{{ group.name }}編集</h1>
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="groupname"
          >
            グループ名
          </label>
          <input
            id="groupname"
            v-model="form.name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="グループ名を入力してください"
            required
          />
        </div>
        <div class="mb-4">
          <p class="block text-gray-700 text-sm font-bold mb-2">
            先頭車両を選択してください
          </p>
          <label
            v-for="(carName, carId) in group.carsName"
            :key="carId"
            class="block text-gray-700 text-sm font-bold mb-2 text-left"
          >
            <input
              v-model="form.parent"
              type="radio"
              class="form-radio"
              name="radio"
              :value="carId"
              checked
            />
            {{ carName }}
          </label>
        </div>
        <div class="block text-center">
          <button
            class="inline-block w-24 p-2 bg-yellow-0 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            @click="update"
          >
            更新
          </button>
        </div>
        <div class="block text-center">
          <nuxt-link
            class="inline-block w-24 mt-5 p-2 bg-blue-600 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            :to="`/group/${groupId}/display`"
          >
            キャンセル
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onBeforeMount,
  reactive,
} from 'nuxt-composition-api'
import { Group, HasId } from '@@/models/firestore'

export default defineComponent({
  middleware: 'authenticated',
  setup(_, { root: { $firebase, $route, $router } }) {
    const form = reactive({
      name: '',
      parent: '',
    })
    const groupId = $route.params.groupId
    const group = ref({} as Group & HasId)

    onBeforeMount(() => {
      $firebase
        .firestore()
        .collection('groups')
        .doc(groupId)
        .get()
        .then((groupSnap) => {
          const groupData = {
            ...groupSnap.data(),
            id: groupSnap.id,
          } as Group & HasId
          group.value = groupData
          form.name = groupData.name
          form.parent = groupData.parent
        })
    })

    const update = () => {
      $firebase
        .firestore()
        .collection('groups')
        .doc(group.value.id)
        .update({
          name: form.name,
          parent: form.parent,
        })
        .then(() => {
          $router.push(`/group/${groupId}/display`)
        })
    }

    return {
      form,
      groupId,
      group,
      update,
    }
  },
})
</script>
