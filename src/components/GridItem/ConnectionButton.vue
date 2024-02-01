<template>
  <button class="connection" :class="[direction]" v-if="needsConnection" @click="createConnection">
    <UpArrow class="icon" :class="[direction]" />
  </button>
</template>

<script setup>
import { computed } from 'vue'
import UpArrow from '@/components/icons/UpArrow.vue'
import { useGridStore } from '@/stores/grid'

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

const needsConnection = computed(() => {
  if (!props.item || props.item?.purchased === false) {
    return false
  }

  return !props.item?.connections?.find((connection) => connection.direction === props.direction)
})

const grid = useGridStore()

const createConnection = () => {
  grid.createConnection(props)
}
</script>

<style scoped>
.connection {
  position: absolute;
  z-index: 1;
  width: 28px;
  height: 28px;
  appearance: none;
  border-radius: 4px;
  background-color: white;
  padding: 0;
  border: 1px solid rgb(0 0 0 / 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.24s ease;

  &::before {
    content: '';
    position: absolute;
    left: -25%;
    top: -25%;
    width: 150%;
    height: 150%;
    z-index: -1;
  }

  &:hover {
    transform: scale(1.2);
  }

  &.north {
    top: -18px;
    left: calc(50% - 14px);
  }

  &.south {
    bottom: -18px;
    left: calc(50% - 14px);
  }

  &.east {
    right: -18px;
    top: calc(50% - 14px);
  }

  &.west {
    left: -18px;
    top: calc(50% - 14px);
  }
}

.icon {
  width: 12px;
  height: 12px;

  &.east {
    transform: rotate(90deg);
  }

  &.south {
    transform: rotate(180deg);
  }

  &.west {
    transform: rotate(270deg);
  }
}
</style>
