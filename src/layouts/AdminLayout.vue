<template>
  <div class="flex h-screen overflow-hidden bg-background-dark text-white font-sans">
    <!-- Sidebar -->
    <AdminSidebar 
      :nav-items="navItems"
      :active-tab="activeTab"
      @nav-click="handleNavClick"
      @sign-out="handleSignOut"
    />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Header -->
      <AdminHeader 
        :search-query="searchQuery"
        @update:search-query="searchQuery = $event"
      />

      <!-- Dashboard Area -->
      <main class="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 custom-scrollbar">
        <router-view 
          :search-query="searchQuery"
          :active-tab="activeTab"
        />
      </main>
    </div>
  </div>
</template>

<script>
import AdminSidebar from '../components/admin/AdminSidebar.vue'
import AdminHeader from '../components/admin/AdminHeader.vue'
import { NAV_ITEMS } from '../constants/admin'

export default {
  name: 'AdminLayout',
  components: {
    AdminSidebar,
    AdminHeader
  },
  data() {
    return {
      navItems: NAV_ITEMS,
      activeTab: 'projects',
      searchQuery: ''
    }
  },
  watch: {
    // Cập nhật activeTab dựa trên route
    $route(to) {
      const routeMap = {
        '/admin': 'dashboard',
        '/admin/dashboard': 'dashboard',
        '/admin/profile': 'profile',
        '/admin/skills': 'skills',
        '/admin/projects': 'projects',
        '/admin/contacts': 'contact'
      }
      this.activeTab = routeMap[to.path] || 'projects'
    }
  },
  mounted() {
    // Set activeTab dựa trên route hiện tại
    const routeMap = {
      '/admin': 'dashboard',
      '/admin/dashboard': 'dashboard',
      '/admin/profile': 'profile',
      '/admin/skills': 'skills',
      '/admin/projects': 'projects',
      '/admin/contact': 'contact'
    }
    this.activeTab = routeMap[this.$route.path] || 'projects'
  },
  methods: {
    // Xử lý click navigation
    handleNavClick(tabId) {
      this.activeTab = tabId
      const routeMap = {
        dashboard: '/admin',
        profile: '/admin/profile',
        skills: '/admin/skills',
        projects: '/admin',
        contact: '/admin/contacts'
      }
      const route = routeMap[tabId] || '/admin'
      if (this.$route.path !== route) {
        this.$router.push(route)
      }
    },
    // Xử lý sign out
    handleSignOut() {
      // TODO: Thêm logic đăng xuất
      console.log('Sign out')
      // this.$router.push('/')
    }
  }
}
</script>

<style scoped>
/* Styles đã được xử lý bởi Tailwind CSS */
</style>
