import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', redirect: '/login'},
    { path: '/login', name: 'login', component: () => import('../views/login/index.vue') },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('../views/menu/index.vue'),
      children: [
        {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/index.vue')
        },
        {
          path: '/set',
          name: 'set',
          component: () => import('../views/set/index.vue')
        },
        {
          path: '/overview',
          name: 'overview',
          component: () => import('../views/overView/index.vue')
        }
      ]
    }
  ]
})

export default router
