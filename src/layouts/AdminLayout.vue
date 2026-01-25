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
        { path: '/admin', label: 'Dashboard', icon: '📊' },
        // Có thể thêm các menu khác sau này
        // { path: '/admin/users', label: 'Quản lý người dùng', icon: '👥' },
        // { path: '/admin/projects', label: 'Quản lý dự án', icon: '📁' },
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
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: var(--bg-color, #0f172a);
  color: var(--text-color, #e2e8f0);
}

/* Sidebar */
.admin-sidebar {
  width: 260px;
  background: rgba(15, 23, 42, 0.95);
  border-right: 1px solid rgba(51, 65, 85, 0.5);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
}

.admin-sidebar.collapsed {
  width: 70px;
}

.sidebar-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(51, 65, 85, 0.5);
}

.logo {
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color, #3b82f6), var(--secondary-color, #8b5cf6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
  overflow: hidden;
}

.toggle-btn {
  background: none;
  border: none;
  color: var(--text-color, #e2e8f0);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
}

.toggle-btn:hover {
  color: var(--primary-color, #3b82f6);
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  color: rgba(148, 163, 184, 0.9);
  text-decoration: none;
  transition: all 0.3s ease;
  gap: 1rem;
}

.nav-item:hover {
  background: rgba(51, 65, 85, 0.3);
  color: var(--primary-color, #3b82f6);
}

.nav-item.active {
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary-color, #3b82f6);
  border-right: 3px solid var(--primary-color, #3b82f6);
}

.nav-item .icon {
  font-size: 1.25rem;
  min-width: 24px;
  text-align: center;
}

.nav-item .label {
  white-space: nowrap;
  overflow: hidden;
}

.sidebar-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(51, 65, 85, 0.5);
}

.back-home {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(148, 163, 184, 0.9);
  text-decoration: none;
  padding: 0.75rem;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.back-home:hover {
  background: rgba(51, 65, 85, 0.3);
  color: var(--primary-color, #3b82f6);
}

.back-home .icon {
  font-size: 1.25rem;
  min-width: 24px;
  text-align: center;
}

/* Main content */
.admin-main {
  flex: 1;
  margin-left: 260px;
  transition: margin-left 0.3s ease;
  display: flex;
  flex-direction: column;
}

.admin-main.sidebar-open {
  margin-left: 260px;
}

.admin-sidebar.collapsed ~ .admin-main {
  margin-left: 70px;
}

.admin-header {
  background: rgba(15, 23, 42, 0.95);
  border-bottom: 1px solid rgba(51, 65, 85, 0.5);
  padding: 1.5rem 2rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.admin-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

/* Responsive */
@media (max-width: 768px) {
  .admin-sidebar {
    transform: translateX(-100%);
  }
  
  .admin-sidebar:not(.collapsed) {
    transform: translateX(0);
  }
  
  .admin-main {
    margin-left: 0;
  }
  
  .admin-sidebar.collapsed ~ .admin-main {
    margin-left: 0;
  }
}
</style>
