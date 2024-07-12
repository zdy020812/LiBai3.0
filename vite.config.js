import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { resolve } from 'path' // 主要用于alias文件路径别名

export default defineConfig({
  plugins: [vue()],
  lintOnSave: false,
  base: './',	//不加打包后会白屏
  server: {             
    host: '0.0.0.0',
    port: 5051,      
    open: true,
    hmr: {
      overlay: false
    }
  },
  port: 5051,
  resolve:{   
    //别名配置，引用src路径下的东西可以通过@如：import Layout from '@/layout/index.vue'
    alias: {
      // 别名配置
      // 键必须以斜线开始和结束
      '@': resolve(__dirname, 'src'),
      'components': resolve(__dirname, './src/components'),
      'assets': resolve(__dirname, './src/assets'),
      '#': resolve(__dirname, 'types'),
      build: resolve(__dirname, 'build')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', 'csv'],
  },
})