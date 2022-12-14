import { router } from './router'
import { createPinia } from 'pinia'
import './main.less'
import app from './app'


const pinia = createPinia();
// 这里需要改成异步加载
// materialList.forEach((m) => {
//   const renderFn = getMaterialRenderFun(m)
//   app.component(m.name, renderFn)
// })
app.use(router);
app.use(pinia);
app.mount('#app')