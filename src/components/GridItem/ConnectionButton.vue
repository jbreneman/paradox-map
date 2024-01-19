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
  width: 32px;
  height: 32px;
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

  &:hover {
    transform: scale(1.2);
  }

  &.north {
    top: -20px;
    left: calc(50% - 16px);
  }

  &.south {
    bottom: -20px;
    left: calc(50% - 16px);
  }

  &.east {
    right: -20px;
    top: calc(50% - 16px);
  }

  &.west {
    left: -20px;
    top: calc(50% - 16px);
  }
}

.icon {
  width: 16px;
  height: 16px;

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
