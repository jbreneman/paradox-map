<template>
  <span class="modifier-icon" v-if="name">
    <img class="icon-image" :src="src" alt="" />
  </span>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const src = computed(() => {
  return `./icons/${props.name}.png`
})
</script>

<style scoped>
.modifier-icon {
  width: 24px;
  height: 24px;
}

.icon-image {
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
}
</style>
