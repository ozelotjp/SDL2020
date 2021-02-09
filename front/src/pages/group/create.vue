<template>
  <div class="text-center mt-20">
    <div class="w-full max-w-xs mx-auto pt-5">
      <h1 class="font-bold mb-5 text-lg">グループ作成</h1>
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
            v-model="groupName"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="グループ名を入力してください"
            required
          />
        </div>
        <div class="block text-center">
          <button
            class="inline-block w-24 p-2 bg-yellow-0 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="create"
          >
            作成
          </button>
        </div>
        <div>
          <nuxt-link
            class="inline-block w-24 mt-5 p-2 bg-blue-600 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            to="/group"
          >
            キャンセル
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'nuxt-composition-api'

export default defineComponent({
  middleware: 'authenticated',
  setup(_, { root: { $firebase, $router } }) {
    const groupName = ref('')
    const create = () => {
      $firebase
        .firestore()
        .collection('users')
        .doc($firebase.auth().currentUser!.uid)
        .collection('cars')
        .get()
        .then((carsSnap) => {
          $firebase
            .firestore()
            .collection('groups')
            .add({
              name: groupName.value,
              cars: [carsSnap.docs[0].id],
              carsName: {
                [carsSnap.docs[0].id]: carsSnap.docs[0].data().name,
              },
              parent: carsSnap.docs[0].id,
              createdAt: $firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((snap) => {
              $router.push(`/group/${snap.id}/complete`)
            })
        })
    }

    return {
      groupName,
      create,
    }
  },
})
</script>
