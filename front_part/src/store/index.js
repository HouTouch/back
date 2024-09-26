import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'

const pinia = createPinia()
//pinia持久化存储
pinia.use(createPersistedState())

export default pinia