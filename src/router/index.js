/**
 * Router chính của ứng dụng
 * Import và kết hợp các routes từ mainRoutes và adminRoutes
 */

import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

// Import các routes đã tách riêng
import mainRoutes from './mainRoutes'
import adminRoutes from './adminRoutes'

// Định nghĩa các routes chính của ứng dụng
const routes = [
  {
    path: '/',
    component: MainLayout,
    children: mainRoutes
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: adminRoutes,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  // Route 404 - Not Found (uncomment khi đã tạo NotFound.vue)
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('../pages/main/NotFound.vue'),
  //   meta: {
  //     title: 'Không tìm thấy trang'
  //   }
  // }
]

// Tạo router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guards - có thể thêm authentication check ở đây
router.beforeEach((to, from, next) => {
  // Set document title từ meta
  if (to.meta.title) {
    document.title = `${to.meta.title} - Portfolio`
  }

  // Kiểm tra authentication nếu route yêu cầu
  if (to.meta.requiresAuth) {
    // TODO: Thêm logic kiểm tra authentication
    // const isAuthenticated = useAuthStore().isAuthenticated
    // if (!isAuthenticated) {
    //   next({ name: 'Login' })
    //   return
    // }
  }

  // Kiểm tra quyền admin nếu route yêu cầu
  if (to.meta.requiresAdmin) {
    // TODO: Thêm logic kiểm tra quyền admin
    // const isAdmin = useAuthStore().isAdmin
    // if (!isAdmin) {
    //   next({ name: 'Home' })
    //   return
    // }
  }

  next()
})

export default router
