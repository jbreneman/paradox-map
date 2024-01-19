<template>
  <PanZoom>
    <div class="app-grid">
      <GridItem
        v-for="(item, index) in items"
        :key="index"
        v-bind="item"
        @add-connection="createConnection"
      />
    </div>
  </PanZoom>
</template>

<script setup>
import { computed } from 'vue'
import GridItem from './GridItem.vue'
import PanZoom from './layout/PanZoom.vue'
import { useGridStore } from '@/stores/grid'

const store = useGridStore()

const items = computed(() => {
  return store.grid.reduce((acc, cur, y) => {
    return acc.concat(
      cur.map((item, x) => {
        return {
          item,
          x,
          y
        }
      })
    )
  }, [])
})

const createConnection = (opts) => {
  store.createConnection(opts)
}
</script>

<style scoped>
.app-grid {
  --amount: 27;
  display: grid;
  grid-template-columns: repeat(var(--amount), 125px);
  gap: var(--spacing-200);
}
</style>
