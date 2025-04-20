
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
// 映入全局样式
import './assets/css/common.scss'

const app = createApp(App)

import ElementPlus from 'element-plus'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
//引入Elmessage和Elloading的css样式文件
import 'element-plus/theme-chalk/el-loading.css';

//svg图标
import 'virtual:svg-icons-register'
import 'element-plus/dist/index.css'

// //导入pinia
import pinia from './store/index'
app.use(pinia)

app.use(ElementPlus, {
    locale: zhCn,
})

app.use(router)


app.mount('#app')
