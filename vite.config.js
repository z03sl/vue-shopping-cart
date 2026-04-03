import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// 线上 GitHub Pages 为 https://<用户>.github.io/vue-shopping-cart/，生产构建需子路径；本地开发用根路径
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/vue-shopping-cart/' : '/',
  plugins: [vue()],
}))
