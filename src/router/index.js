import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '',
        // component: () => import('../views/Main.vue'),
      },
      {
        path: 'master',
        component: () => import('../components/MasterTable.vue')
      },
      {
        path: 'book',
        component: () => import('../components/BookTable.vue')
      },
      {
        path: 'check',
        component: () => import('../components/CheckTable.vue')
      },
      {
        path: 'userinfo',
        component: () => import('../components/UserInfo.vue')
      }
    ]
  },
  {
    path: '/face',
    name: 'face',
    component: () => import('../components/FaceTable.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
