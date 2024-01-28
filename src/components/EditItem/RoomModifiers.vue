<template>
  <div class="room-modifiers">
    <h3 class="modifier-heading">Modifiers</h3>
    <ModifierInput
      v-for="(modifier, index) in modifiers"
      :modifier="modifier"
      :room-type="roomType"
      :can-remove="modifiers.length > 1"
      :key="index"
      @update="(value) => update(index, value)"
      @remove="() => remove(index)"
    />
    <BaseButton class="add" @click="add" :disabled="!canAdd"> Add modifier </BaseButton>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import ModifierInput from './ModifierInput.vue'

const props = defineProps({
  modifiers: {
    type: Array,
    required: true
  },
  roomType: {
    type: String,
    required: false
  }
})
const emit = defineEmits(['update'])

const update = (index, value) => {
  emit(
    'update',
    props.modifiers.map((modifier, idx) => {
      if (idx === index) {
        return value
      }
      return modifier
    })
  )
}

const add = () => {
  emit('update', [...props.modifiers, { type: '', amount: 1 }])
}

const remove = (index) => {
  emit(
    'update',
    props.modifiers.filter((_, idx) => idx !== index)
  )
}

const canAdd = computed(() => {
  return (
    props.modifiers.reduce((acc, cur) => {
      return acc + cur.amount
    }, 0) < 5
  )
})
</script>

<style scoped>
.room-modifiers {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-200);
}

.modifier-heading {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
}

.add {
  margin-left: auto;
}
</style>
