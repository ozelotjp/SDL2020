<template>
  <div class="text-center mt-20">
    <h1 class="font-bold mb-5 text-lg">ドライブ中</h1>
    <div class="block text-center"></div>
    <GmapMap
      :ref="mapRef"
      :center="{ lat: 35.168242, lng: 136.885764 }"
      :zoom="15"
      map-type-id="terrain"
      style="width: 100%; height: 300px;"
    >
      <GmapMarker
        v-for="(m, i) in markers"
        :key="i"
        :position="{ lat: m.lat, lng: m.lng }"
      />
    </GmapMap>
    <div id="map"></div>
    <nuxt-link
      class="inline-block mt-5 p-2 bg-blue-600 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
      :to="`/group/${groupId}/display`"
    >
      ドライブを終了する
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onBeforeMount,
  onBeforeUnmount,
} from 'nuxt-composition-api'

export default defineComponent({
  middleware: 'authenticated',
  setup(_, { root: { $firebase, $route, $set } }) {
    const groupId = $route.params.groupId
    const mapRef = ref()
    const position = reactive({
      lat: 0,
      lng: 0,
    })
    const markers = ref({} as { [curId: string]: { lat: number; lng: number } })

    onBeforeMount(() => {
      $firebase
        .firestore()
        .collection('users')
        .doc($firebase.auth().currentUser!.uid)
        .collection('cars')
        .get()
        .then((userCarsSnap) => {
          $firebase
            .firestore()
            .collection('cars')
            .doc(userCarsSnap.docs[0].id)
            .set({
              blinker: 'OFF',
              compass: 'NORTH',
              currentGroup: groupId,
              position: new $firebase.firestore.GeoPoint(0, 0),
            })
        })

      $firebase
        .firestore()
        .collection('cars')
        .where('currentGroup', '==', groupId)
        .onSnapshot((snapshot) => {
          snapshot.docs.forEach((doc) => {
            const data = doc.data()
            $set(markers.value, doc.id, {
              lat: data.position.oa,
              lng: data.position.ha,
            })
          })
        })
    })

    onBeforeUnmount(() => {
      $firebase
        .firestore()
        .collection('users')
        .doc($firebase.auth().currentUser!.uid)
        .collection('cars')
        .get()
        .then((userCarsSnap) => {
          $firebase
            .firestore()
            .collection('cars')
            .doc(userCarsSnap.docs[0].id)
            .set({
              blinker: 'OFF',
              compass: 'NORTH',
              currentGroup: '',
              position: new $firebase.firestore.GeoPoint(0, 0),
            })
        })
    })

    return {
      groupId,
      mapRef,
      position,
      markers,
    }
  },
})
</script>
