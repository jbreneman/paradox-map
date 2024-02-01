<template>
  <div class="room-modifiers">
    <h3 class="modifier-heading">Modifiers</h3>
    <nav class="not-purchased" v-if="!purchased">
      <BaseButton
        :class="{ active: activeDirection === direction.key }"
        v-for="direction in directions"
        :key="direction.key"
        @click.prevent="() => updateDirection(direction.key)"
      >
        {{ direction.label }}
      </BaseButton>
    </nav>
    <ModifierInput
      v-for="(modifier, index) in activeModifiers"
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
import { computed, ref } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import ModifierInput from './ModifierInput.vue'

const props = defineProps({
  modifiers: {
    type: Array,
    required: true
  },
  potentialModifiers: {
    type: Object,
    required: true
  },
  roomType: {
    type: String,
    required: false
  },
  purchased: {
    type: Boolean,
    required: false
  }
})
const emit = defineEmits(['update'])

const activeDirection = ref('north')
const directions = [
  { key: 'north', label: 'North' },
  { key: 'east', label: 'East' },
  { key: 'south', label: 'South' },
  { key: 'west', label: 'West' }
]

const updateDirection = (value) => {
  activeDirection.value = value
}

const activeModifiers = computed(() => {
  if (props.purchased) {
    return props.modifiers
  }

  return props.potentialModifiers[activeDirection.value]
})

const update = (index, value) => {
  if (props.purchased) {
    emit('update', {
      modifiers: props.modifiers.map((modifier, idx) => {
        if (idx === index) {
          return value
        }
        return modifier
      })
    })
  } else {
    emit('update', {
      potentialModifiers: {
        ...props.potentialModifiers,
        [activeDirection.value]: props.potentialModifiers[activeDirection.value].map(
          (modifier, idx) => {
            if (idx === index) {
              return value
            }
            return modifier
          }
        )
      }
    })
  }
}

const add = () => {
  if (props.purchased) {
    emit('update', { modifiers: [...props.modifiers, { type: '', amount: 1 }] })
  } else {
    emit('update', {
      potentialModifiers: {
        ...props.potentialModifiers,
        [activeDirection.value]: [
          ...props.potentialModifiers[activeDirection.value],
          { type: '', amount: 1 }
        ]
      }
    })
  }
}

const remove = (index) => {
  if (props.purchased) {
    emit('update', { modifiers: props.modifiers.filter((_, idx) => idx !== index) })
  } else {
    emit('update', {
      potentialModifiers: {
        ...props.potentialModifiers,
        [activeDirection.value]: props.potentialModifiers[activeDirection.value].filter(
          (_, idx) => idx !== index
        )
      }
    })
  }
}

const canAdd = computed(() => {
  const modifiers = props.purchased
    ? props.modifiers
    : props.potentialModifiers[activeDirection.value]
  return (
    modifiers.reduce((acc, cur) => {
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

.not-purchased {
  display: flex;
  gap: var(--spacing-100);

  > * {
    flex-grow: 1;
  }

  .active {
    color: white;
    background: black;
  }
}

.add {
  margin-left: auto;
}
</style>
