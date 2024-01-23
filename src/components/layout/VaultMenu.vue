<template>
  <Menu as="div" class="vault-menu">
    <MenuButton class="menu-button">
      Menu
      <ChevronDown />
    </MenuButton>
    <MenuItems class="menu-items">
      <MenuItem as="button" class="menu-item" @click="newMap"> Create new map </MenuItem>
      <hr class="menu-divider" v-if="items?.length" />
      <MenuItem v-for="item in items" :key="item.id" as="div" class="menu-option">
        <button
          class="menu-item"
          :class="{ 'is-active': item.active }"
          :disabled="item.active"
          @click="() => loadMap(item.id)"
        >
          <span>{{ item.label }}</span>
          <Checkmark class="menu-icon" v-if="item.active" />
        </button>
        <button v-if="!item.active" @click="() => deleteMap(item.id)" aria-label="Remove vault">
          <Close class="menu-icon menu-delete" />
        </button>
      </MenuItem>
      <hr class="menu-divider" />
      <!--<MenuItem as="button" class="menu-item" @click="about"> About </MenuItem>-->
      <MenuItem
        as="a"
        target="_blank"
        class="menu-item"
        href="https://github.com/jbreneman/paradox-map"
        >View on Github
      </MenuItem>
    </MenuItems>
  </Menu>
</template>

<script setup>
import { computed } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import ChevronDown from '@/components/icons/ChevronDown.vue'
import Checkmark from '@/components/icons/Checkmark.vue'
import Close from '@/components/icons/Close.vue'
import { useVaultsStore } from '@/stores/vaults'
import { useGridStore } from '@/stores/grid'

const store = useVaultsStore()
const grid = useGridStore()

const items = computed(() => {
  const hasCurrent = store.vaults?.find((vault) => vault.id === grid.id)
  const vaults = hasCurrent
    ? store.vaults
    : (store.vaults ?? []).concat([{ id: grid.id, name: grid.name }])

  return vaults.map((vault) => {
    const active = vault.id === grid.id

    return {
      id: vault.id,
      label: active ? grid.name : vault.name,
      active
    }
  })
})

const newMap = () => {
  store.addVault({
    id: grid.id,
    name: grid.name,
    grid: grid.grid
  })
  grid.createGrid()
}

const loadMap = (id) => {
  const vault = store.getVault(id)
  store.addVault({
    id: grid.id,
    name: grid.name,
    grid: grid.grid
  })
  grid.setGrid(vault)
}

const deleteMap = (id) => {
  store.deleteVault(id)
}

const about = () => {}
</script>

<style scoped>
.vault-menu {
  position: relative;
  display: block;
}

.menu-button {
  display: flex;
  justify-content: center;
  border-radius: 4px;
  appearance: none;
  background: #f6f6f6;
  border: 2px solid rgb(0 0 0 / 0.3);
  padding: var(--spacing-100) var(--spacing-200);
  font-size: 0.875rem;
  cursor: pointer;
}

.menu-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  button {
    background: transparent;
    border: none;
  }
  &:hover {
    background-color: black;
    color: white;
  }
}

.menu-items {
  position: absolute;
  z-index: 10;
  right: 0;
  margin-top: var(--spacing-200);
  background: white;
  padding: var(--spacing-200);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 0.08);
  border: 1px solid #dddddd;
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-100);
}

.menu-item {
  width: 100%;
  appearance: none;
  text-decoration: none;
  color: inherit;
  border-radius: 3px;
  border: 0;
  background: white;
  padding: var(--spacing-200);
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
  line-height: 1.2;
  display: flex;
  align-items: center;
  gap: var(--spacing-200);

  &:hover {
    background-color: black;
    color: white;
  }

  &.is-active {
    background-color: black;
    color: white;
    cursor: not-allowed;
  }
}

.menu-icon {
  width: 16px;
  height: 16px;
  margin-left: auto;
}
.menu-delete {
  fill: red;
  border-radius: 2px;
  padding: 2px;
  cursor: pointer;

  &:hover {
    fill: white;
  }
}

.menu-divider {
  width: 100%;
  height: 1px;
  border: none;
  background: rgb(0 0 0 / 0.1);
  margin: var(--spacing-100) 0;
}
</style>
