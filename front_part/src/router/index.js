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
        },
        {
          path: '/product_manage',
          name: 'product_manage',
          component: () => import('../views/user_manage/product_manage/index.vue')
        },
        {
          path: '/message_manage',
          name: 'message_manage',
          component: () => import('../views/user_manage/message_manage/index.vue')
        },
        {
          path: '/user_list',
          name: 'user_list',
          component: () => import('../views/user_manage/user_list/index.vue')
        },
        {
          path: '/users_manage',
          name: 'users_manage',
          component: () => import('../views/user_manage/users_manage/index.vue')
        },
        {
          path: '/product_manager',
          name: 'product_manager',
          component: () => import('../views/product/product_manage/index.vue')
        },
        {
          path: '/product_manager_outList',
          name: 'product_manager_outList',
          component: () => import('../views/product/product_manager_outList/index.vue')
        },
        {
          path: '/message_list',
          name: 'message_list',
          component: () => import('../views/message/message_list/index.vue')
        },
        {
          path: '/file',
          name: 'file',
          component: () => import('../views/file/index.vue')
        },
        {
          path: '/login_log',
          name: 'login_log',
          component: () => import('../views/login_log/index.vue')
        },
        {
          path: '/operation_log',
          name: 'operation_log',
          component: () => import('../views/operation_log/index.vue')
        },
      ]
    }
  ]
})

export default router
