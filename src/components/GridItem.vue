<template>
  <div class="grid-item-wrap">
    <ConnectionButton
      :item="item"
      :direction="direction"
      v-for="direction in directions"
      :key="direction"
    />
    <ConnectionTunnel
      :item="item"
      :direction="direction"
      v-for="direction in directions"
      :key="direction"
    />
    <button
      class="grid-item empty"
      :class="classes"
      v-if="!item"
      @click="addRoom"
      aria-label="Create room"
    ></button>
    <button v-else class="grid-item" :class="classes" @click="setActive">
      <span class="room-name" v-if="name">
        {{ name }}
      </span>
      <span class="god-name" v-if="god">
        {{ god }}
      </span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  ROOM_LABELS,
  ROOM_TYPES,
  GOD_LABELS,
  OMEGA_ROOMS,
  CHALLENGE_ROOMS,
  createRoom
} from '@/util/room'
import ConnectionButton from '@/components/GridItem/ConnectionButton.vue'
import ConnectionTunnel from '@/components/GridItem/ConnectionTunnel.vue'
import { useEditingStore } from '@/stores/editing'
import { useGridStore } from '@/stores/grid'

const props = defineProps({
  item: {
    type: Object,
    default: null
  },
  x: {
    type: Number,
    default: null
  },
  y: {
    type: Number,
    default: null
  }
})

const store = useEditingStore()
const grid = useGridStore()

const isActive = computed(() => {
  return store.room?.id && store.room?.id === props.item?.id
})

const classes = computed(() => {
  const style = props.item?.style
  const omega = OMEGA_ROOMS.includes(props.item?.type)
  const challenge = CHALLENGE_ROOMS.includes(props.item?.type)
  return [
    style,
    {
      'is-active': isActive.value,
      'not-purchased': props.item?.purchased === false,
      omega,
      challenge
    }
  ].filter(Boolean)
})

const name = computed(() => {
  const label = ROOM_LABELS[props.item?.type]

  return label ?? null
})

const setActive = () => {
  if (props.item.type === ROOM_TYPES.PORTAL) {
    return
  }
  store.setRoom(props.item)
}

const directions = ['north', 'east', 'south', 'west']

const god = computed(() => {
  const label = GOD_LABELS[props.item?.style]

  return label ?? null
})

const addRoom = () => {
  grid.setRoom(createRoom({ purchased: false }), props.x, props.y)
}
</script>

<style scoped>
@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

.grid-item-wrap {
  position: relative;
}

.grid-item {
  --shadow: 0 0 0 transparent;
  --color: black;
  appearance: none;
  border: 0;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow:
    var(--shadow),
    0 0 0 0 rgb(0 0 0 / 0.25);
  transition: box-shadow 0.24s ease;
  border: 4px solid #dddddd;
  background: #eeeeee;
  padding: var(--spacing-300);
}

.is-active {
  box-shadow:
    var(--shadow),
    0 0 0 4px rgb(0 0 0 / 0.25);
}

.room-name {
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 700;
}

.god-name {
  position: absolute;
  bottom: var(--spacing-300);
  font-size: 0.875rem;
  color: var(--color);
  font-weight: 700;
}

.empty,
.none {
  border: none;
  opacity: 1;
}

.not-purchased:not(.none) {
  opacity: 0.5;
}

.portal {
  position: relative;
  z-index: 0;
  overflow: hidden;
  cursor: initial;
  border: none;
}

.portal::before {
  content: '';
  position: absolute;
  z-index: -2;
  left: -50%;
  top: -50%;
  width: 200%;
  height: 200%;
  background-color: #399953;
  background-repeat: no-repeat;
  background-size:
    50% 50%,
    50% 50%;
  background-position:
    0 0,
    100% 0,
    100% 100%,
    0 100%;
  background-image: linear-gradient(var(--velara), var(--velara)),
    linear-gradient(var(--wendarr), var(--wendarr)), linear-gradient(var(--idona), var(--idona)),
    linear-gradient(var(--tenos), var(--tenos));
  animation: rotate 40s linear infinite;
}

.portal::after {
  content: '';
  position: absolute;
  z-index: -1;
  left: 4px;
  top: 4px;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  background: white;
  border-radius: 2px;
}

.omega {
  --shadow: 0 0 3px 2px var(--omega);
}

.challenge {
  --shadow: 0 0 3px 2px var(--challenge);
}

.idona,
.velara,
.tenos,
.wendarr {
  border: 4px solid var(--color);
  background: color-mix(in srgb, var(--color), white 90%);
}

.idona {
  --color: var(--idona);
}

.velara {
  --color: var(--velara);
}

.tenos {
  --color: var(--tenos);
}

.wendarr {
  --color: var(--wendarr);
}
</style>
