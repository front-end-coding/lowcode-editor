import { createRouter } from 'vue-router'
import routes from '~pages'
import { createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})