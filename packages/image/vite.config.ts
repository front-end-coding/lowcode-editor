import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import pkg from './package.json'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/index.ts',
      /**挂载window上的名称 */
      name: 'lcImage',
      fileName: `lc-image.${pkg.version}`,
      formats: ['umd'],
    }
  }
})