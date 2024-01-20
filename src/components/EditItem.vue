<template>
  <transition name="edit">
    <section class="edit-item" v-if="store.room">
      <button class="close-button" aria-label="Close" @click="close">
        <Close class="close-icon" />
      </button>
      <h2 class="edit-heading">Edit room</h2>
      <div class="fields">
        <label class="field">
          <span class="label"> Type </span>
          <select @input="updateType" class="select">
            <option value="" :selected="store.room?.type === ''"></option>
            <option
              v-for="item in types"
              :key="item.value"
              :value="item.value"
              :selected="store.room?.type === item.value"
            >
              {{ item.label }}
            </option>
          </select>
        </label>
        <label class="field">
          <span class="label"> God </span>
          <select @input="updateStyle" class="select">
            <option value="none" :selected="['none', ''].includes(store.room?.style ?? '')">
              None
            </option>
            <option
              v-for="item in styles"
              :key="item.value"
              :value="item.value"
              :selected="store.room?.style === item.value"
            >
              {{ item.label }}
            </option>
          </select>
        </label>
      </div>
      <footer class="footer">
        <button class="remove" @click="remove">Delete</button>
      </footer>
    </section>
  </transition>
</template>

<script setup>
import { useEditingStore } from '@/stores/editing'
import { useGridStore } from '@/stores/grid'
import Close from '@/components/icons/Close.vue'
import { ROOM_LABELS, ROOM_TYPES, GODS, GOD_LABELS } from '@/util/room'

const store = useEditingStore()
const grid = useGridStore()

const close = () => {
  store.setRoom(null)
}

const types = Object.values(ROOM_TYPES)
  .filter((room) => room !== ROOM_TYPES.PORTAL)
  .sort()
  .map((room) => {
    return {
      label: ROOM_LABELS[room],
      value: room
    }
  })

const updateType = (e) => {
  store.modifyRoom({ type: e.target.value })
}

const styles = Object.values(GODS)
  .sort()
  .map((name) => {
    return {
      label: GOD_LABELS[name],
      value: name
    }
  })

const updateStyle = (e) => {
  store.modifyRoom({ style: e.target.value })
}

const remove = () => {
  grid.removeRoom(store.room.id)
  store.setRoom(null)
}
</script>

<style scoped>
.edit-enter-active,
.edit-leave-active {
  transition: opacity 0.24s ease;
}

.edit-enter-from,
.edit-leave-to {
  opacity: 0;
}

.edit-item {
  padding: var(--spacing-400);
  background: white;
  border-radius: 4px;
  box-shadow: 0 0 4px rgb(0 0 0 / 0.1);
  width: 280px;
}

.close-button {
  position: absolute;
  top: var(--spacing-200);
  right: var(--spacing-200);
  appearance: none;
  border: 0;
  background: #dddddd;
  padding: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    .close-icon {
      transform: scale3d(1.1, 1.1, 1.1);
    }
  }
}

.close-icon {
  pointer-events: none;
  width: 12px;
  height: 12px;
  transition: transform 0.24s ease;
}

.edit-heading {
  margin: 0;
  font-size: 1.25rem;
  margin-top: -4px;
}

.fields {
  display: flex;
  flex-direction: column;
  margin-top: var(--spacing-300);
  gap: var(--spacing-200);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-100);
}

.label {
  font-size: 0.875rem;
  font-weight: 700;
}

.select {
  padding: var(--spacing-200);
  border: 2px solid #000;
  border-radius: 4px;
}

.footer {
  display: flex;
  margin-top: var(--spacing-300);
}

.remove {
  display: flex;
  justify-content: center;
  border-radius: 4px;
  appearance: none;
  color: white;
  background: #cc0303;
  border: 2px solid rgb(255 255 255 / 0.6);
  padding: var(--spacing-100) var(--spacing-200);
  font-size: 0.875rem;
  cursor: pointer;
}
</style>
