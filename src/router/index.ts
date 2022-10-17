import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home.vue'),
    children: [
      {
        path: "/index",
        component: () => import('../views/mainPage/index.vue'),
      },
      {
        path: "/user",
        component: () => import('../views/mainPage/user.vue'),
      },
      {
        path: "/food",
        component: () => import('../views/mainPage/food.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
