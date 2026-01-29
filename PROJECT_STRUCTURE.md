# Cấu trúc dự án Portfolio Vue.js

## Tổng quan

Dự án được tổ chức theo cấu trúc hiện đại của Vue.js 3, tách biệt rõ ràng giữa **Main Page (Client)** và **Admin Page (Dashboard)**.

## Cấu trúc thư mục

```
portfolio-vue/
├── public/                 # Static files
├── src/
│   ├── assets/            # Assets (images, fonts, styles)
│   │   ├── images/        # Hình ảnh
│   │   ├── fonts/         # Fonts
│   │   └── styles/        # Global styles
│   │
│   ├── components/         # Components
│   │   ├── main/          # Components cho Main Page
│   │   │   ├── AppHeader.vue
│   │   │   ├── AppFooter.vue
│   │   │   ├── Hero.vue
│   │   │   ├── About.vue
│   │   │   ├── TechStack.vue
│   │   │   ├── Projects.vue
│   │   │   └── Contact.vue
│   │   ├── admin/         # Components cho Admin Page
│   │   └── common/        # Components dùng chung
│   │
│   ├── layouts/           # Layout components
│   │   ├── MainLayout.vue  # Layout cho Main Page
│   │   └── AdminLayout.vue # Layout cho Admin Page
│   │
│   ├── pages/             # Page components (thay vì views)
│   │   ├── main/          # Pages cho Main Page
│   │   │   └── Home.vue
│   │   └── admin/         # Pages cho Admin Page
│   │       └── AdminDashboard.vue
│   │
│   ├── router/            # Router configuration
│   │   ├── index.js       # Router chính (import mainRoutes & adminRoutes)
│   │   ├── mainRoutes.js  # Routes cho Main Page
│   │   └── adminRoutes.js # Routes cho Admin Page
│   │
│   ├── stores/            # Pinia stores
│   │   ├── main/          # Stores cho Main Page
│   │   │   └── useMainStore.js
│   │   └── admin/         # Stores cho Admin Page
│   │       └── useAdminStore.js
│   │
│   ├── services/          # API services
│   │   ├── api.js      # Base API config
│   │   ├── main/           # Services cho Main Page
│   │   │   └── projectService.js
│   │   └── admin/         # Services cho Admin Page
│   │       └── adminService.js
│   │
│   ├── utils/             # Utility functions
│   │   └── helpers.js
│   │
│   ├── composables/       # Vue composables
│   │   └── useScrollSpy.js
│   │
│   ├── App.vue            # Root component
│   ├── main.js            # Entry point
│   └── style.css          # Global styles
│
├── index.html
├── vite.config.js
└── package.json
```

## Chi tiết các phần

### 1. Layouts

#### MainLayout.vue
- Layout cho website chính (client)
- Bao gồm: Header, Footer, Router View
- Xử lý scroll spy để highlight menu

#### AdminLayout.vue
- Layout cho trang quản trị
- Bao gồm: Sidebar, Header, Router View
- Có thể collapse/expand sidebar

### 2. Router

#### router/index.js
- Router chính của ứng dụng
- Import và kết hợp `mainRoutes` và `adminRoutes`
- Xử lý navigation guards (authentication, authorization)

#### router/mainRoutes.js
- Định nghĩa tất cả routes cho Main Page
- Routes con của MainLayout

#### router/adminRoutes.js
- Định nghĩa tất cả routes cho Admin Page
- Routes con của AdminLayout
- Có meta để kiểm tra quyền admin

### 3. Stores (Pinia)

#### stores/main/useMainStore.js
- Quản lý state cho Main Page
- Ví dụ: activeSection, isLoading

#### stores/admin/useAdminStore.js
- Quản lý state cho Admin Page
- Ví dụ: sidebarCollapsed, currentPage, user

### 4. Services

#### services/api.js
- Base API configuration
- Xử lý authentication headers
- Error handling

#### services/main/projectService.js
- API calls cho projects (client side)

#### services/admin/adminService.js
- API calls cho admin dashboard

### 5. Utils & Composables

#### utils/helpers.js
- Các hàm tiện ích: formatDate, formatCurrency, debounce, scrollToElement

#### composables/useScrollSpy.js
- Composable để theo dõi section đang được xem khi scroll

## Cách sử dụng

### Thêm route mới cho Main Page

1. Tạo page component trong `src/pages/main/`
2. Thêm route vào `src/router/mainRoutes.js`:

```javascript
{
  path: 'about',
  name: 'About',
  component: () => import('../pages/main/About.vue'),
  meta: { title: 'Giới thiệu' }
}
```

### Thêm route mới cho Admin Page

1. Tạo page component trong `src/pages/admin/`
2. Thêm route vào `src/router/adminRoutes.js`:

```javascript
{
  path: 'users',
  name: 'AdminUsers',
  component: () => import('../pages/admin/Users.vue'),
  meta: {
    title: 'Quản lý người dùng',
    requiresAuth: true,
    requiresAdmin: true
  }
}
```

### Sử dụng Store

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

const projects = await projectService.getPublicProjects()
```

## Lưu ý

1. **Pinia**: Cần cài đặt `npm install pinia` và uncomment trong `main.js`
2. **Axios**: Nếu muốn dùng axios, cài `npm install axios` và cập nhật `services/api.js`
3. **Environment Variables**: Sử dụng `.env` file để cấu hình `VITE_API_BASE_URL`
