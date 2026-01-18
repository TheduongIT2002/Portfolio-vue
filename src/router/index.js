import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

// Định nghĩa các routes cho ứng dụng
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

// Tạo router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
