<template>
  <div class="text-center mt-20">
    <div class="w-full max-w-xs mx-auto pt-5">
      <h1 class="font-bold mb-5 text-lg">グループに招待されました！</h1>
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <p>{{ groupName }}</p>
        </div>
        <div class="mb-4">
          <button
            class="inline-block w-24 mt-5 p-2 bg-yellow-0 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            @click="joinGroup"
          >
            参加
          </button>
        </div>
        <div class="mb-4">
          <nuxt-link
            class="inline-block w-24 mt-5 p-2 bg-blue-600 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            to="/group"
          >
            断る
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'nuxt-composition-api'
import { Group } from '@@/models/firestore'

export default defineComponent({
  middleware: 'authenticated',
  setup(_, { root: { $firebase, $route, $router } }) {
    const groupId = $route.params.groupId
    const groupName = ref('')

    onBeforeMount(() => {
      $firebase
        .firestore()
        .collection('groups')
        .doc(groupId)
        .get()
        .then((groupSnap) => {
          const groupData = groupSnap.data() as Group
          groupName.value = groupData.name
        })
    })

    const joinGroup = () => {
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
            .doc(groupId)
            .update({
              cars: $firebase.firestore.FieldValue.arrayUnion(
                carsSnap.docs[0].id
              ),
              [`carsName.${carsSnap.docs[0].id}`]: carsSnap.docs[0].data().name,
            })
            .then(() => {
              $router.push(`/group/${groupId}/display`)
            })
        })
    }

    return {
      groupId,
      groupName,
      joinGroup,
    }
  },
})
</script>
