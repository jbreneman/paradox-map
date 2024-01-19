<template>
  <span class="connection-tunnel" :class="[direction]" v-if="hasConnection"> </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    default: null
  },
  direction: {
    type: String,
    default: null
  }
})

const hasConnection = computed(() => {
  if (!props.item) {
    return false
  }

  return props.item?.connections?.find((connection) => connection.direction === props.direction)
})
</script>

<style scoped>
.connection-tunnel {
  position: absolute;
  z-index: 2;
  width: 16px;
  height: 16px;
  background-color: white;
  border-left: 4px solid rgb(0 0 0 / 0.2);
  border-right: 4px solid rgb(0 0 0 / 0.2);

  &.north {
    top: -12px;
    left: calc(50% - 8px);
  }

  &.south {
    bottom: -12px;
    left: calc(50% - 8px);
  }

  &.east {
    transform: rotate(90deg);
    right: -12px;
    top: calc(50% - 8px);
  }

  &.west {
    transform: rotate(90deg);
    left: -12px;
    top: calc(50% - 8px);
  }
}
</style>
