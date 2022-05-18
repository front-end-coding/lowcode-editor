import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import viteMocker from 'vite-plugin-mocker';
import path from 'path'

export default defineConfig({
  plugins: [
    viteMocker({
      delay: [0, 1000],
    }),
    vue(),
    Pages({
      exclude: ['**/components/*'],
    })
  ],
  // vite解析@,tsconfig paths单独配置
  resolve: {
    alias: [
      { find: '@', replacement: path.join(__dirname, 'src') }
    ]
  }
})