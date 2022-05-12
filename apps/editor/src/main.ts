import { createApp } from 'vue';
import App from './App.vue';
import { IMaterial } from '@lc2048/shared'
import { loadScript } from './utils';
import { router } from './router'
import './main.less'


// 这里是左侧物料列表
const materialList: IMaterial[] = [{
  id: 1,
  name: 'lcImage',
  title: '图片',
  type: 'component',
  categoty: {
    name: '基础组件'
  },
  version: '0.0.1',
  source: '/lc-image.0.0.1.umd.js',
  thumbnail: '',
  data: [
    {
      version: '0.0.1',
      source: '/lc-image.0.0.1.umd.js'
    }
  ]
}]

Promise.all(materialList.map(m => loadScript(m.source).then(res => {
  const app = createApp(App);
  console.log('注册组件', (window as any).lcImage)
  const { render, editProps } = (window as any)[m.name];
  app.component('lc-image', render)
  app.use(router);
  app.mount('#app')
})))

// loadScript('/lc-image.1.0.0.umd.js').then(() => {
//   console.log('注册组件', (window as any).lcImage)
//   const { render, editProps } = (window as any).lcImage;
//   const app = createApp(App);
//   app.component('lc-image', render)
//   app.mount('#app')
// })
