/**
 * Pinia Store cho Admin Page
 * Quản lý state cho phần admin/dashboard
 */

import { defineStore } from 'pinia'
import { MOCK_PROJECTS } from '../../constants/admin'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    // State cho admin page
    sidebarCollapsed: false,
    currentPage: 'dashboard',
    user: {
      name: 'Dương P.',
      role: 'Admin',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlDdyQ8Ba5esOSYsO8P6qxwsdVe0XXp7L_DSXgHzSX7-G4eb0j_O7ooBQ37L4yvcYc7IAv2bPUx5V6edp6lGSZe2SUAjdgs3ikCM8aXGSc_QPceUnwwpCruub_0dNE3GjF0pzlDbfcR4VdijN9TF2r0HMsg9jxJ-ZRfDtmJHR4df96ei2hGLHLgBGtqlgcTgldFclz3uLiCxUtKzd9teVEQBgHs7HWcy5OVzgr0JLFfvXx9QOMDIkPQLY-srT4yVqlOwf1hZwlGWtP'
    },
    projects: MOCK_PROJECTS,
    searchQuery: '',
    statusFilter: 'All',
    sortBy: 'date-newest'
  }),

  getters: {
    // Getters cho admin page
    isSidebarOpen: (state) => !state.sidebarCollapsed,
    
    // Tính toán stats từ projects
    stats: (state) => {
      return {
        total: state.projects.length,
        published: state.projects.filter(p => p.status === 'Published').length,
        drafts: state.projects.filter(p => p.status === 'Draft').length
      }
    },
    
    // Lọc và sắp xếp projects
    filteredProjects: (state) => {
      let filtered = state.projects.filter(p => {
        // Lọc theo search query
        const matchesSearch = !state.searchQuery || 
          p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
          p.description.toLowerCase().includes(state.searchQuery.toLowerCase())
        
        // Lọc theo status
        const matchesStatus = state.statusFilter === 'All' || p.status === state.statusFilter
        
        return matchesSearch && matchesStatus
      })

      // Sắp xếp
      filtered = [...filtered].sort((a, b) => {
        switch (state.sortBy) {
          case 'date-newest':
            return new Date(b.createdAt) - new Date(a.createdAt)
          case 'date-oldest':
            return new Date(a.createdAt) - new Date(b.createdAt)
          case 'name-asc':
            return a.name.localeCompare(b.name)
          case 'name-desc':
            return b.name.localeCompare(a.name)
          default:
            return 0
        }
      })

      return filtered
    }
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
    },
    
    setSearchQuery(query) {
      this.searchQuery = query
    },
    
    setStatusFilter(filter) {
      this.statusFilter = filter
    },
    
    setSortBy(sort) {
      this.sortBy = sort
    },
    
    addProject(project) {
      this.projects.push(project)
    },
    
    updateProject(id, updates) {
      const index = this.projects.findIndex(p => p.id === id)
      if (index !== -1) {
        this.projects[index] = { ...this.projects[index], ...updates }
      }
    },
    
    deleteProject(id) {
      const index = this.projects.findIndex(p => p.id === id)
      if (index !== -1) {
        this.projects.splice(index, 1)
      }
    }
  }
})
