import './assets/main.css'

import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { saveVaults, saveCurrentVault } from '@/util/save'

const app = createApp(App)
const pinia = createPinia()

watch(
  pinia.state,
  (state) => {
    saveVaults(state.vaults)
    saveCurrentVault(state.grid)
  },
  { deep: true }
)

app.use(pinia)

app.mount('#app')
