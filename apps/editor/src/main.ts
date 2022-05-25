import { createApp } from 'vue';
import App from './App.vue';
import { loadMaterial } from './utils';
import { router } from './router'
import { createPinia } from 'pinia'
import './main.less'
import { materialList, getMaterialEditRenderFun } from './data'
const pinia = createPinia();

loadMaterial(materialList).then(() => {
  const app = createApp(App);
  materialList.forEach((m) => {
    const renderFn = getMaterialEditRenderFun(m)
    app.component(m.name, renderFn)
  })
  app.use(router);
  app.use(pinia);
  app.mount('#app')
})