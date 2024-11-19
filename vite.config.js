/*
 * @Author: wangmr mingrui@whut.edu.cn
 * @Date: 2024-11-19 20:00:19
 * @LastEditors: wangmr mingrui@whut.edu.cn
 * @LastEditTime: 2024-11-19 20:08:06
 * @FilePath: /BigHealth/BigHealthMarket_FrontEnd/vite.config.js
 * @Description: 定义了
 * 2405499352@qq.com
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 80,
    open: true,
    proxy: {
      '/dev-api': {
        target: 'http://localhost:8888', //以 /dev-api 开头的请求会被代理到 http://localhost:8888
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/dev-api/, '')
      }
    }
  },

  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output:{
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },

  resolve: {
    // 使用import导入文件时刻省略后缀
    extensions: ['.js', '.vue', '.json','.css'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }

})