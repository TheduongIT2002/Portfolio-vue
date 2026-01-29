/**
 * Routes cho Admin Page (Dashboard)
 * Chứa tất cả các routes cho trang quản trị
 */

// Định nghĩa routes cho admin
const adminRoutes = [
  {
    path: '',
    name: 'AdminDashboard',
    component: () => import('../pages/admin/AdminDashboard.vue'),
    meta: {
      title: 'Dashboard',
      requiresAuth: true,
      requiresAdmin: true
    }
  }
  // Có thể thêm các routes khác sau này:
  // {
  //   path: 'users',
  //   name: 'AdminUsers',
  //   component: () => import('../pages/admin/Users.vue'),
  //   meta: {
  //     title: 'Quản lý người dùng',
  //     requiresAuth: true,
  //     requiresAdmin: true
  //   }
  // },
  // {
  //   path: 'projects',
  //   name: 'AdminProjects',
  //   component: () => import('../pages/admin/Projects.vue'),
  //   meta: {
  //     title: 'Quản lý dự án',
  //     requiresAuth: true,
  //     requiresAdmin: true
  //   }
  // }
]

export default adminRoutes
