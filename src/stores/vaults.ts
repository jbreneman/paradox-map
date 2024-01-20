import { defineStore } from 'pinia'
import type { Grid } from '@/util/grid'
import { getVaults } from '@/util/save'

export interface Vault {
  id: string
  grid: Grid
  name: string
}

export const useVaultsStore = defineStore('vaults', {
  state: () => {
    return {
      vaults: [] as Vault[]
    }
  },
  actions: {
    init() {
      this.vaults = getVaults()?.vaults ?? []
    },
    addVault(data: Vault) {
      if (this.vaults.find((vault) => vault.id === data.id)) {
        this.vaults = this.vaults.map((vault) => {
          if (vault.id === data.id) {
            return data
          }

          return vault
        })
      } else {
        this.vaults = [...this.vaults, data]
      }
    },
    getVault(id: string) {
      return this.vaults.find((vault) => vault.id === id)
    }
  }
})
