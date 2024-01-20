<template>
  <input class="vault-name" aria-label="Vault name" :value="value" @input="setName" />
</template>

<script setup>
import { computed } from 'vue'
import { useGridStore } from '@/stores/grid'

const store = useGridStore()

const value = computed(() => {
  return store.name
})
const setName = (e) => {
  store.setName(e.target.value)
}
</script>

<style scoped>
.vault-name {
  appearance: none;
  border: none;
  padding: var(--spacing-100) var(--spacing-200);
  border-radius: 4px;
  font-size: 1rem;
  transition: box-shadow 0.24s ease;
  background: #f6f6f6;
  width: 200px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgb(0 0 0 / 0.4);
  }
}
</style>
