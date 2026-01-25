/**
 * Service cho Admin
 * Xử lý các API calls cho admin dashboard
 */

import { apiRequest } from '../api'

export const adminService = {
  // Lấy thống kê dashboard
  async getDashboardStats() {
    try {
      const data = await apiRequest('/admin/stats')
      return data
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      throw error
    }
  },

  // Quản lý users
  async getUsers() {
    try {
      const data = await apiRequest('/admin/users')
      return data
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  },

  // Quản lý projects
  async getProjects() {
    try {
      const data = await apiRequest('/admin/projects')
      return data
    } catch (error) {
      console.error('Error fetching projects:', error)
      throw error
    }
  }
}
