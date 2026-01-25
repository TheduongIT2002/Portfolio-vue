/**
 * Pinia Store cho Admin Page
 * Quản lý state cho phần admin/dashboard
 */

import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    // State cho admin page
    sidebarCollapsed: false,
    currentPage: 'dashboard',
    user: null
  }),

  getters: {
    // Getters cho admin page
    isSidebarOpen: (state) => !state.sidebarCollapsed
  },

  actions: {
    // Actions cho admin page
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },

    setCurrentPage(page) {
      this.currentPage = page
    },

    setUser(user) {
      this.user = user
    }
  }
})
