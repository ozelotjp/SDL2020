<template>
  <div>
    init for debug
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'

export default defineComponent({
  middleware: 'authenticated',
  setup(_, { root: { $firebase } }) {
    const positions = [
      { lt: 35.168242, lo: 136.886764 },
      { lt: 35.168242, lo: 136.886264 },
      { lt: 35.168242, lo: 136.885764 },
      { lt: 35.168242, lo: 136.885264 },
      { lt: 35.167742, lo: 136.885264 },
      { lt: 35.167242, lo: 136.885264 },
      { lt: 35.167242, lo: 136.885764 },
      { lt: 35.167242, lo: 136.886264 },
      { lt: 35.167242, lo: 136.886764 },
      { lt: 35.167742, lo: 136.886764 },
    ]
    let i = 0
    setInterval(() => {
      if (i > 9) {
        i = 0
      }
      $firebase
        .firestore()
        .collection('cars')
        .doc('hogehoge')
        .update({
          position: new $firebase.firestore.GeoPoint(
            positions[i].lt,
            positions[i].lo
          ),
        })
      console.log(`[${i}] ${positions[i]}`)
      i++
    }, 500)
  },
})
</script>
