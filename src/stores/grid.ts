import { defineStore } from 'pinia'
import { createRoom, ROOM_TYPES } from '@/util/room'
import type { Room, Direction } from '@/util/room'
import {
  createGrid,
  placeItem,
  updateItem,
  getInverseDirection,
  getAdjacentItem,
  removeItem
} from '@/util/grid'
import type { Grid } from '@/util/grid'
import { id } from '@/util/id'
import { useEditingStore } from './editing'
import type { Vault } from './vaults'
import { getCurrentVault } from '@/util/save'

export const useGridStore = defineStore('grid', {
  state: () => {
    return {
      grid: null as Grid | null,
      name: 'My vault',
      id: null as string | null
    }
  },
  actions: {
    init() {
      const saved = getCurrentVault()
      if (saved) {
        this.setGrid(saved)
      } else {
        this.createGrid()
      }
    },
    createGrid() {
      const grid = createGrid()
      this.grid = placeItem(grid, createRoom({ style: 'portal', type: 'portal' }), {
        x: 13,
        y: 13
      })
      this.id = id()
      this.name = 'My vault'
    },
    setGrid(vault: Vault) {
      this.grid = vault.grid
      this.id = vault.id
      this.name = vault.name
    },
    createConnection({ item, direction }: { item: Room; direction: Direction }) {
      if (!this.grid) {
        return
      }
      const editing = useEditingStore()
      const existing = getAdjacentItem(this.grid, item, direction)
      const toRoom = existing
        ? {
            ...existing,
            purchased: true,
            connections: [
              ...(existing.connections ?? []),
              { id: item.id, direction: getInverseDirection(direction) }
            ]
          }
        : createRoom({
            purchased: true,
            type: ROOM_TYPES.COMMON,
            connections: [{ id: item.id, direction: getInverseDirection(direction) }]
          })

      const fromRoom = {
        ...item,
        connections: [...(item.connections ?? []), { id: toRoom.id, direction }]
      }
      const updatedGrid = updateItem(this.grid, fromRoom)
      this.grid = placeItem(updatedGrid, toRoom, {
        anchor: fromRoom
      })

      if (toRoom.style !== 'portal') {
        editing.setRoom(toRoom)
      }
    },
    removeConnection({ item, direction }: { item: Room; direction: Direction }) {
      if (!this.grid) {
        return
      }

      const adjacent = getAdjacentItem(this.grid, item, direction) as Room
      const toRoom = {
        ...adjacent,
        connections: adjacent.connections?.filter((connection) => connection.id !== item.id)
      }

      const fromRoom = {
        ...item,
        connections: item.connections?.filter((connection) => connection.id !== toRoom.id)
      }
      const updatedGrid = updateItem(this.grid, fromRoom)
      this.grid = updateItem(updatedGrid, toRoom)
    },
    updateRoom(item: Room) {
      if (!this.grid) {
        return
      }
      this.grid = updateItem(this.grid, item)
    },
    setRoom(item: Room, x: number, y: number) {
      if (!this.grid) {
        return
      }
      const editing = useEditingStore()
      this.grid = placeItem(this.grid, item, {
        x,
        y
      })

      editing.setRoom(item)
    },
    removeRoom(id: string) {
      if (!this.grid) {
        return
      }

      this.grid = removeItem(this.grid, id)
    },
    setName(name: string) {
      this.name = name
    }
  }
})
