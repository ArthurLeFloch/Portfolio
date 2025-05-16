import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('../views/HomeView.vue') },
    { path: '/web', component: () => import('../views/WebView.vue') },
    { path: '/others', component: () => import('../views/OthersView.vue') },
  ],
})

export default router
