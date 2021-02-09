<template>
  <div class="text-center mt-20">
    <div class="w-full max-w-xs mx-auto pt-5">
      <h1 class="font-bold mb-5 text-lg">車両番号登録</h1>
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            車両のニックネーム
          </label>
          <input
            v-model="name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="かるがもカー"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="vin">
            車両番号
          </label>
          <input
            id="vin"
            v-model="vin"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="エラー"
            readonly
          />
        </div>
        <p class="block text-gray-700 text-sm font-bold mb-4">
          カーナビに表示されている車両番号と照会の上、登録してください。
        </p>

        <div class="block text-center mb-2">
          <button
            class="inline-block w-24 p-2 bg-yellow-0 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            @click="updateVin"
          >
            登録
          </button>
        </div>
        <div>
          <nuxt-link
            class="inline-block w-24 p-2 bg-blue-600 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
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
  setup(_, { root: { $firebase, $nuxt, $route, $router } }) {
    const name = ref('')
    const vin = $route.query.vin as string | null
    if (vin === null) {
      $nuxt.error({ statusCode: 400, message: '$route.query.vin is null.' })
    }

    const updateVin = () => {
      const userCarsRef = $firebase
        .firestore()
        .collection('users')
        .doc($firebase.auth().currentUser!.uid)
        .collection('cars')

      userCarsRef.get().then((userCarsSnap) => {
        userCarsSnap.docs.forEach((userCarSnap) => {
          userCarSnap.ref.delete()
        })
        userCarsRef
          .doc(vin!)
          .set({
            name: name.value,
            createdAt: $firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            $router.push('/group')
          })
      })
    }

    return {
      name,
      vin,
      updateVin,
    }
  },
})
</script>
