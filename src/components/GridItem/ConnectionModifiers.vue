<template>
  <span class="connection-modifiers" :class="[direction]" v-if="!item?.purchased && modifiers">
    <ModifierIcon
      class="modifier-icon"
      :name="modifier.type"
      v-for="(modifier, index) in modifiers"
      :key="index"
    />
  </span>
</template>

<script setup>
import { computed } from 'vue'
import ModifierIcon from '@/components/GridItem/ModifierIcon.vue'

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

const modifiers = computed(() => {
  return props.item?.potentialModifiers?.[props.direction]
})
</script>

<style scoped>
.connection-modifiers {
  --spacing: var(--spacing-100);
  position: absolute;
  z-index: 3;
  display: flex;
  justify-content: center;
  pointer-events: none;

  &.north,
  &.south {
    width: 100%;
    height: 20px;
  }

  &.north {
    top: var(--spacing);
  }

  &.south {
    bottom: var(--spacing);
  }

  &.east,
  &.west {
    height: 100%;
    width: 20px;
    flex-direction: column;
  }

  &.east {
    right: var(--spacing);
  }

  &.west {
    left: var(--spacing);
  }
}

.modifier-icon {
  width: 16px;
  height: 16px;
}
</style>
