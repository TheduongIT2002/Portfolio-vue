/**
 * Pinia Store cho Main Page
 * Quản lý state cho phần client/main của website
 */

import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    // State cho main page
    activeSection: 'home',
    isLoading: false
  }),

  getters: {
    // Getters cho main page
    isHomeSection: (state) => state.activeSection === 'home'
  },

  actions: {
    // Actions cho main page
    setActiveSection(section) {
      this.activeSection = section
    },

    setLoading(loading) {
      this.isLoading = loading
    }
  }
})
