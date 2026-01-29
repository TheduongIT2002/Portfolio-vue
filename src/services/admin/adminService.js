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
  },
  
  // Tạo project mới
  async createProject(projectData) {
    try {
      const data = await apiRequest('/admin/projects', {
        method: 'POST',
        body: JSON.stringify(projectData)
      })
      return data
    } catch (error) {
      console.error('Error creating project:', error)
      throw error
    }
  },
  
  // Cập nhật project
  async updateProject(id, projectData) {
    try {
      const data = await apiRequest(`/admin/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(projectData)
      })
      return data
    } catch (error) {
      console.error('Error updating project:', error)
      throw error
    }
  },
  
  // Xóa project
  async deleteProject(id) {
    try {
      const data = await apiRequest(`/admin/projects/${id}`, {
        method: 'DELETE'
      })
      return data
    } catch (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  }
}
