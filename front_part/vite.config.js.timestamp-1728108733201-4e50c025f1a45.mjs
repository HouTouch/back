// vite.config.js
import { defineConfig } from "file:///E:/Html_project/general%20back/front/node_modules/.pnpm/vite@5.4.5_@types+node@22.5.5_sass@1.78.0_terser@5.32.0/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/Html_project/general%20back/front/node_modules/.pnpm/@vitejs+plugin-vue@5.1.3_vite@5.4.5_@types+node@22.5.5_sass@1.78.0_terser@5.32.0__vue@3.5.5/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///E:/Html_project/general%20back/front/node_modules/.pnpm/unplugin-auto-import@0.18.3_@vueuse+core@9.13.0_vue@3.5.5__rollup@4.21.3_webpack-sources@3.2.3/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/Html_project/general%20back/front/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.25.6_rollup@4.21.3_vue@3.5.5_webpack-sources@3.2.3/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///E:/Html_project/general%20back/front/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.25.6_rollup@4.21.3_vue@3.5.5_webpack-sources@3.2.3/node_modules/unplugin-vue-components/dist/resolvers.js";
import { createSvgIconsPlugin } from "file:///E:/Html_project/general%20back/front/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.4.5_@types+node@22.5.5_sass@1.78.0_terser@5.32.0_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "E:\\Html_project\\general back\\front";
var pathResolve = (dir) => resolve(__vite_injected_original_dirname, dir);
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/svg")],
      symbolId: "icon-[dir]-[name]"
    })
  ],
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: []
    }
  },
  server: {
    port: 8080,
    //默认启动的端口号
    open: true,
    //是否自动打开浏览器
    cors: true
    //是否开启跨域
  },
  resolve: {
    alias: {
      "@": pathResolve("./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxIdG1sX3Byb2plY3RcXFxcZ2VuZXJhbCBiYWNrXFxcXGZyb250XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxIdG1sX3Byb2plY3RcXFxcZ2VuZXJhbCBiYWNrXFxcXGZyb250XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9IdG1sX3Byb2plY3QvZ2VuZXJhbCUyMGJhY2svZnJvbnQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcclxuXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5cclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuXHJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcclxuY29uc3QgcGF0aFJlc29sdmUgPSAoZGlyKSA9PiByZXNvbHZlKF9fZGlybmFtZSwgZGlyKVxyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWUoKSxcclxuICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgICBlc2xpbnRyYzoge1xyXG4gICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXVxyXG4gICAgfSksXHJcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgIGljb25EaXJzOiBbcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9zdmcnKV0sXHJcbiAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nXHJcbiAgICB9KVxyXG4gIF0sXHJcbiAgcGx1Z2luT3B0aW9uczoge1xyXG4gICAgJ3N0eWxlLXJlc291cmNlcy1sb2FkZXInOiB7XHJcbiAgICAgIHByZVByb2Nlc3NvcjogJ3Njc3MnLFxyXG4gICAgICBwYXR0ZXJuczogW11cclxuICAgIH1cclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogODA4MCwgLy9cdTlFRDhcdThCQTRcdTU0MkZcdTUyQThcdTc2ODRcdTdBRUZcdTUzRTNcdTUzRjdcclxuICAgIG9wZW46IHRydWUsIC8vXHU2NjJGXHU1NDI2XHU4MUVBXHU1MkE4XHU2MjUzXHU1RjAwXHU2RDRGXHU4OUM4XHU1NjY4XHJcbiAgICBjb3JzOiB0cnVlIC8vXHU2NjJGXHU1NDI2XHU1RjAwXHU1NDJGXHU4REU4XHU1N0RGXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IHBhdGhSZXNvbHZlKCcuL3NyYycpXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBRWhCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBRXBDLFNBQVMsNEJBQTRCO0FBQ3JDLFNBQVMsZUFBZTtBQVZ4QixJQUFNLG1DQUFtQztBQVd6QyxJQUFNLGNBQWMsQ0FBQyxRQUFRLFFBQVEsa0NBQVcsR0FBRztBQUduRCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxNQUNqQyxVQUFVO0FBQUEsUUFDUixTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDbkMsQ0FBQztBQUFBLElBQ0QscUJBQXFCO0FBQUEsTUFDbkIsVUFBVSxDQUFDLFFBQVEsUUFBUSxJQUFJLEdBQUcsZ0JBQWdCLENBQUM7QUFBQSxNQUNuRCxVQUFVO0FBQUEsSUFDWixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsZUFBZTtBQUFBLElBQ2IsMEJBQTBCO0FBQUEsTUFDeEIsY0FBYztBQUFBLE1BQ2QsVUFBVSxDQUFDO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFlBQVksT0FBTztBQUFBLElBQzFCO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
