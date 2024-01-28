import { defineStore } from 'pinia'
import type { Room } from '@/util/room'
import deepmerge from 'deepmerge'
import { useGridStore } from './grid'

const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray

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
      this.room = deepmerge(this.room ?? {}, room, { arrayMerge: overwriteMerge })
      grid.updateRoom(this.room)
    }
  }
})
