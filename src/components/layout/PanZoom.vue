<template>
  <div class="pan-zoom" ref="element">
    <slot></slot>
  </div>
</template>

<script setup>
import panzoom from 'panzoom'
import { ref, onMounted, onUnmounted } from 'vue'

const element = ref(null)
let instance = null

onMounted(() => {
  instance = panzoom(element.value, {
    smoothScroll: false,
    zoomSpeed: 0.05,
    zoomDoubleClickSpeed: 1,
    onTouch: function () {
      return false
    }
  })
})

onUnmounted(() => {
  instance.dispose()
})
</script>
