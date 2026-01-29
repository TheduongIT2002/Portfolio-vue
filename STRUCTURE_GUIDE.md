# Hướng dẫn cấu trúc dự án Portfolio Vue.js

## 📁 Cấu trúc cây thư mục

```
portfolio-vue/
│
├── public/                          # Static files
│   └── vite.svg
│
├── src/
│   │
│   ├── assets/                     # Assets (images, fonts, styles)
│   │   ├── images/                 # Hình ảnh
│   │   ├── fonts/                  # Fonts
│   │   └── styles/                  # Global styles
│   │
│   ├── components/                  # Components
│   │   ├── main/                   # Components cho Main Page
│   │   │   ├── AppHeader.vue       # Header của trang chủ
│   │   │   ├── AppFooter.vue       # Footer của trang chủ
│   │   │   ├── Hero.vue            # Hero section
│   │   │   ├── About.vue           # About section
│   │   │   ├── TechStack.vue       # Tech stack section
│   │   │   ├── Projects.vue        # Projects section
│   │   │   └── Contact.vue         # Contact section
│   │   │
│   │   ├── admin/                  # Components cho Admin Page
│   │   │   └── (sẽ thêm sau)
│   │   │
│   │   └── common/                 # Components dùng chung
│   │       └── (sẽ thêm sau)
│   │
│   ├── layouts/                    # Layout components
│   │   ├── MainLayout.vue          # Layout cho Main Page
│   │   └── AdminLayout.vue         # Layout cho Admin Page
│   │
│   ├── pages/                      # Page components
│   │   ├── main/                   # Pages cho Main Page
│   │   │   └── Home.vue            # Trang chủ
│   │   │
│   │   └── admin/                  # Pages cho Admin Page
│   │       └── AdminDashboard.vue  # Dashboard admin
│   │
│   ├── router/                     # Router configuration
│   │   ├── index.js                # Router chính
│   │   ├── mainRoutes.js           # Routes cho Main Page
│   │   └── adminRoutes.js          # Routes cho Admin Page
│   │
│   ├── stores/                     # Pinia stores
│   │   ├── main/                   # Stores cho Main Page
│   │   │   └── useMainStore.js     # Main store
│   │   │
│   │   └── admin/                  # Stores cho Admin Page
│   │       └── useAdminStore.js    # Admin store
│   │
│   ├── services/                   # API services
│   │   ├── api.js                  # Base API config
│   │   ├── main/                   # Services cho Main Page
│   │   │   └── projectService.js    # Project service
│   │   │
│   │   └── admin/                  # Services cho Admin Page
│   │       └── adminService.js     # Admin service
│   │
│   ├── utils/                      # Utility functions
│   │   └── helpers.js              # Helper functions
│   │
│   ├── composables/                # Vue composables
│   │   └── useScrollSpy.js        # Scroll spy composable
│   │
│   ├── App.vue                     # Root component
│   ├── main.js                     # Entry point
│   └── style.css                   # Global styles
│
├── index.html
├── vite.config.js
├── package.json
└── PROJECT_STRUCTURE.md            # Tài liệu chi tiết
```

## 📝 Ví dụ code

### 1. MainLayout.vue

```vue
<template>
  <div class="main-layout">
    <!-- Header cho trang chủ -->
    <Header :active-section="activeSection" />
    
    <!-- Router view để hiển thị các trang -->
    <router-view />
    
    <!-- Footer cho trang chủ -->
    <Footer />
  </div>
</template>

<script>
import Header from '../components/main/AppHeader.vue'
import Footer from '../components/main/AppFooter.vue'

export default {
  name: 'MainLayout',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      // Section hiện tại (dùng để highlight menu khi scroll)
      activeSection: 'home'
    }
  },
  mounted() {
    // Theo dõi scroll để xác định section đang active (scrollspy)
    window.addEventListener('scroll', this.handleScroll, { passive: true })
    this.handleScroll()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    // Xác định section đang được xem để highlight menu trên Header
    handleScroll() {
      const sections = ['home', 'about', 'tech-stack', 'projects', 'contact']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (!el) continue

        const top = el.offsetTop
        const bottom = top + el.offsetHeight

        if (scrollPosition >= top && scrollPosition < bottom) {
          this.activeSection = section
          break
        }
      }
    }
  }
}
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
}
</style>
```

### 2. AdminLayout.vue

```vue
<template>
  <div class="admin-layout">
    <!-- Sidebar cho admin -->
    <aside class="admin-sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <h2 v-if="!sidebarCollapsed" class="logo">Admin Panel</h2>
        <button 
          class="toggle-btn" 
          @click="toggleSidebar"
          aria-label="Toggle sidebar"
        >
          <span v-if="sidebarCollapsed">☰</span>
          <span v-else>✕</span>
        </button>
      </div>
      
      <nav class="sidebar-nav">
        <ul>
          <li v-for="item in menuItems" :key="item.path">
            <router-link 
              :to="item.path" 
              class="nav-item"
              :class="{ active: $route.path === item.path }"
            >
              <span class="icon">{{ item.icon }}</span>
              <span v-if="!sidebarCollapsed" class="label">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
      
      <div class="sidebar-footer">
        <router-link to="/" class="back-home">
          <span class="icon">🏠</span>
          <span v-if="!sidebarCollapsed">Về trang chủ</span>
        </router-link>
      </div>
    </aside>
    
    <!-- Main content area -->
    <main class="admin-main" :class="{ 'sidebar-open': !sidebarCollapsed }">
      <!-- Top bar -->
      <header class="admin-header">
        <div class="header-content">
          <h1 class="page-title">{{ currentPageTitle }}</h1>
          <div class="header-actions">
            <!-- Có thể thêm user menu, notifications, etc. -->
          </div>
        </div>
      </header>
      
      <!-- Page content -->
      <div class="admin-content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'AdminLayout',
  data() {
    return {
      sidebarCollapsed: false,
      // Menu items cho admin
      menuItems: [
        { path: '/admin', label: 'Dashboard', icon: '📊' }
        // Có thể thêm các menu khác sau này
      ]
    }
  },
  computed: {
    // Lấy tiêu đề trang hiện tại
    currentPageTitle() {
      const currentItem = this.menuItems.find(item => item.path === this.$route.path)
      return currentItem ? currentItem.label : 'Admin'
    }
  },
  methods: {
    // Toggle sidebar
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    }
  }
}
</script>

<style scoped>
/* Styles cho AdminLayout - xem file gốc để biết chi tiết */
</style>
```

### 3. router/mainRoutes.js

```javascript
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
  // }
]

export default mainRoutes
```

### 4. router/adminRoutes.js

```javascript
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
  // }
]

export default adminRoutes
```

### 5. router/index.js

```javascript
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
  // Route 404 - Not Found
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/main/NotFound.vue'),
    meta: {
      title: 'Không tìm thấy trang'
    }
  }
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
  }

  // Kiểm tra quyền admin nếu route yêu cầu
  if (to.meta.requiresAdmin) {
    // TODO: Thêm logic kiểm tra quyền admin
  }

  next()
})

export default router
```

## 🚀 Cách sử dụng

### Thêm route mới cho Main Page

1. Tạo file page trong `src/pages/main/YourPage.vue`
2. Thêm vào `src/router/mainRoutes.js`:

```javascript
{
  path: 'your-page',
  name: 'YourPage',
  component: () => import('../pages/main/YourPage.vue'),
  meta: { title: 'Trang của bạn' }
}
```

### Thêm route mới cho Admin Page

1. Tạo file page trong `src/pages/admin/YourAdminPage.vue`
2. Thêm vào `src/router/adminRoutes.js`:

```javascript
{
  path: 'your-admin-page',
  name: 'YourAdminPage',
  component: () => import('../pages/admin/YourAdminPage.vue'),
  meta: {
    title: 'Trang admin của bạn',
    requiresAuth: true,
    requiresAdmin: true
  }
}
```

### Sử dụng Store (Pinia)

```javascript
import { useMainStore } from '@/stores/main/useMainStore'

export default {
  setup() {
    const mainStore = useMainStore()
    mainStore.setActiveSection('about')
    return { activeSection: mainStore.activeSection }
  }
}
```

### Sử dụng Service

```javascript
import { projectService } from '@/services/main/projectService'

// Trong component
async mounted() {
  try {
    const projects = await projectService.getPublicProjects()
    this.projects = projects
  } catch (error) {
    console.error('Error loading projects:', error)
  }
}
```

## 📦 Cài đặt dependencies

```bash
# Cài Pinia (nếu chưa có)
npm install pinia

# Cài Axios (nếu muốn dùng)
npm install axios
```

Sau đó uncomment code Pinia trong `src/main.js`.

## ✅ Lợi ích của cấu trúc này

1. **Tách biệt rõ ràng**: Main và Admin hoàn toàn độc lập
2. **Dễ mở rộng**: Thêm route, component, service mới rất dễ dàng
3. **Dễ bảo trì**: Code được tổ chức logic, dễ tìm và sửa
4. **Chuẩn hiện đại**: Theo best practices của Vue.js 3
5. **Scalable**: Có thể mở rộng cho nhiều module khác
