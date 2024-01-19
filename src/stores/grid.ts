import { defineStore } from 'pinia'
import { createRoom } from '@/util/room'
import type { Room, Direction } from '@/util/room'
import {
  createGrid,
  placeItem,
  updateItem,
  getInverseDirection,
  getAdjacentItem
} from '@/util/grid'
import type { Grid } from '@/util/grid'
import { useEditingStore } from './editing'

export const useGridStore = defineStore('grid', {
  state: () => {
    return {
      grid: null as Grid | null
    }
  },
  actions: {
    init() {
      const grid = createGrid()
      this.grid = placeItem(grid, createRoom({ style: 'portal', type: 'portal' }), {
        x: 13,
        y: 13
      })
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

      editing.setRoom(toRoom)
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
    }
  }
})
