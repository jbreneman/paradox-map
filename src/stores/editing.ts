import { defineStore } from 'pinia'
import type { Room } from '@/util/room'
import deepmerge from 'deepmerge'
import { useGridStore } from './grid'

export const useEditingStore = defineStore('editing', {
  state: () => {
    return {
      room: null as Room | null
    }
  },
  actions: {
    setRoom(room: Room | null) {
      this.room = room
    },
    modifyRoom(room: Partial<Room>) {
      const grid = useGridStore()
      this.room = deepmerge(this.room ?? {}, room)
      grid.updateRoom(this.room)
    }
  }
})
