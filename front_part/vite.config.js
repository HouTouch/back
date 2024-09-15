import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { resolve } from 'path'
const pathResolve = (dir) => resolve(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
      ]
    }
  },
  server: {
    port: 8080,//默认启动的端口号
    open: true,//是否自动打开浏览器
    cors: true,//是否开启跨域
  },
  resolve: {
    alias: {
      '@': pathResolve('./src')
    }
  },
  
})