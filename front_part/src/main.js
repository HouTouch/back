
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

import ElementPlus from 'element-plus'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
//svg图标
import 'virtual:svg-icons-register'

// //导入pinia
import pinia from './store/index'
app.use(pinia)

app.use(ElementPlus, {
    locale: zhCn,
})

app.use(router)

app.mount('#app')
