import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'

export default defineConfig({
  envPrefix: 'VUE_APP_',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },

  build: {
    outDir: './dist',
    sourcemap: true // 这将为生产环境生成 sourcemap 文件
  },
  base: './', // 设置打包路径
  server: {
    // host: 'jiazhpc.cn',
    // port: 3000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域

    // 设置代理，根据我们项目实际情况配置
    proxy: {
      '/api': {
        target: 'http://jiazhpc.cn',
        changeOrigin: true
      }
    }
  }
})
