<template>
  <div class="modifier-input">
    <select class="select fill" aria-label="Select modifier" @input="updateType">
      <option value="" :selected="modifier.type === ''">New modifier...</option>
      <option
        v-for="item in modifiers"
        :key="item.value"
        :value="item.value"
        :class="[item.type]"
        :selected="modifier.type === item.value"
      >
        {{ item.label }}
      </option>
    </select>
    <select class="select" aria-label="Select modifier" @input="updateAmount">
      <option value="1" :selected="modifier.amount === 1">x1</option>
      <option value="2" :selected="modifier.amount === 2">x2</option>
      <option value="3" :selected="modifier.amount === 3">x3</option>
    </select>
    <RemoveButton @click="remove" :disabled="!canRemove" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { MODIFIER_LABELS, NEGATIVE_MODIFIERS, POSITIVE_MODIFIERS } from '@/util/modifiers'
import RemoveButton from '@/components/RemoveButton.vue'

const props = defineProps({
  modifier: {
    type: Object,
    required: true
  },
  roomType: {
    type: String,
    required: false
  },
  canRemove: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update', 'remove'])

const modifiers = computed(() => {
  const positive = Object.values(POSITIVE_MODIFIERS).map((name) => {
    return { label: MODIFIER_LABELS[name], value: name, type: 'positive' }
  })
  const negative = Object.values(NEGATIVE_MODIFIERS).map((name) => {
    return { label: MODIFIER_LABELS[name], value: name, type: 'negative' }
  })

  if (props.roomType === 'common') {
    return positive
  }
  return [...positive, ...negative]
})

const updateType = (e) => {
  emit('update', {
    ...props.modifier,
    type: e.target.value
  })
}

const updateAmount = (e) => {
  emit('update', {
    ...props.modifier,
    amount: +e.target.value
  })
}

const remove = () => {
  emit('remove')
}
</script>

<style scoped>
.modifier-input {
  width: 100%;
  display: flex;
  gap: var(--spacing-100);
}

.select {
  padding: var(--spacing-200);
  border: 2px solid #000;
  border-radius: 4px;
  flex-shrink: 0;
}

.fill {
  flex-grow: 1;
}

.positive {
  background: #b0eb9d;
}

.negative {
  background: #eb9d9d;
}
</style>
