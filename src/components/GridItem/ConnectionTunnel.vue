<template>
  <span class="connection-tunnel" :class="[direction]" v-if="hasConnection">
    <button class="remove" aria-label="Remove connection" @click="removeConnection">
      <Close class="remove-icon" />
    </button>
  </span>
</template>

<script setup>
import { computed } from 'vue'
import Close from '@/components/icons/Close.vue'
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

const hasConnection = computed(() => {
  if (!props.item) {
    return false
  }

  return props.item?.connections?.find((connection) => connection.direction === props.direction)
})

const grid = useGridStore()

const removeConnection = () => {
  grid.removeConnection(props)
}
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

.remove {
  --scale: scale(0, 0);
  position: absolute;
  left: -8px;
  top: -4px;
  appearance: none;
  background: transparent;
  border: 0;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    --scale: scale(1, 1);
  }
}

.remove-icon {
  width: 20px;
  height: 20px;
  transform: var(--scale);
  transition: transform 0.12s ease;
}
</style>
