import { createApp } from 'vue';
import App from './App.vue';
import { loadScript } from './utils';
import { router } from './router'
import './main.less'
import { materialList } from './data'


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
