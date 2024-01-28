<template>
  <BaseButton class="remove-button" :aria-label="label">
    <Close class="close-icon" />
  </BaseButton>
</template>

<script setup>
import BaseButton from '@/components/base/BaseButton.vue'
import Close from '@/components/icons/Close.vue'

defineProps({
  label: {
    type: String,
    default: 'Remove'
  }
})
</script>

<style scoped>
.remove-button {
  align-items: center;
}

.close-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}
</style>
