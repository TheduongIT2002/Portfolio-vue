/**
 * Routes cho Main Page (Client)
 * Chứa tất cả các routes cho website chính
 */

// Import các pages cho main
import Home from '../pages/main/Home.vue'

// Định nghĩa routes cho main
const mainRoutes = [
  {
    path: '',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Trang chủ',
      requiresAuth: false
    }
  }
  // Có thể thêm các routes khác sau này:
  // {
  //   path: 'about',
  //   name: 'About',
  //   component: () => import('../pages/main/About.vue'),
  //   meta: { title: 'Giới thiệu' }
  // },
  // {
  //   path: 'projects',
  //   name: 'Projects',
  //   component: () => import('../pages/main/Projects.vue'),
  //   meta: { title: 'Dự án' }
  // }
]

export default mainRoutes
