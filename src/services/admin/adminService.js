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

  // Lấy danh sách projects từ Laravel API public (CMS)
  async getCmsProjects(page = 1) {
    try {
      const query = page ? `?page=${page}` : ''
      const data = await apiRequest(`/projects${query}`)
      return data
    } catch (error) {
      console.error('Error fetching CMS projects:', error)
      throw error
    }
  },
  
  // Tạo project mới (với FormData hoặc JSON)
  async createProject(projectData) {
    try {
      const data = await apiRequest('/projects', {
        method: 'POST',
        body: projectData instanceof FormData ? projectData : projectData
      })
      return data
    } catch (error) {
      console.error('Error creating project:', error)
      throw error
    }
  },
  
  // Cập nhật project (với FormData hoặc JSON)
  async updateProject(id, projectData) {
    try {
      // Nếu là FormData, cần thêm _method=PUT cho Laravel
      if (projectData instanceof FormData) {
        projectData.append('_method', 'PUT')
        const data = await apiRequest(`/projects/${id}`, {
          method: 'POST',
          body: projectData
        })
        return data
      } else {
        const data = await apiRequest(`/projects/${id}`, {
          method: 'PUT',
          body: projectData
        })
        return data
      }
    } catch (error) {
      console.error('Error updating project:', error)
      throw error
    }
  },
  
  // Xóa project
  async deleteProject(id) {
    try {
      const data = await apiRequest(`/projects/${id}`, {
        method: 'DELETE'
      })
      return data
    } catch (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  },

  // Quản lý contacts
  async getContacts(page = 1) {
    try {
      const query = page ? `?page=${page}` : ''
      const data = await apiRequest(`/contacts/index/${query}`)
      return data
    } catch (error) {
      console.error('Error fetching contacts:', error)
      throw error
    }
  },

  async getContactById(id) {
    try {
      const data = await apiRequest(`/contacts/${id}`)
      return data
    } catch (error) {
      console.error('Error fetching contact:', error)
      throw error
    }
  },

  async updateContactStatus(id, status) {
    try {
      const data = await apiRequest(`/contacts/update-status/${id}`, {
        method: 'PUT',
        body: { status }
      })
      return data
    } catch (error) {
      console.error('Error updating contact status:', error)
      throw error
    }
  },

  async deleteContact(id) {
    try {
      const data = await apiRequest(`/contacts/destroy/${id}`, {
        method: 'DELETE'
      })
      return data
    } catch (error) {
      console.error('Error deleting contact:', error)
      throw error
    }
  },

  // Quản lý tech stacks & tools
  async getTechStacks(page = 1) {
    try {
      const query = page ? `?page=${page}` : ''
      const data = await apiRequest(`/tech-stacks/index${query}`)
      return data
    } catch (error) {
      console.error('Error fetching tech stacks:', error)
      throw error
    }
  },

  async createTechStack(payload) {
    try {
      const data = await apiRequest('/tech-stacks/store', {
        method: 'POST',
        body: payload
      })
      return data
    } catch (error) {
      console.error('Error creating tech stack:', error)
      throw error
    }
  },

  async getTechStackById(id) {
    try {
      const data = await apiRequest(`/tech-stacks/show/${id}`)
      return data
    } catch (error) {
      console.error('Error fetching tech stack:', error)
      throw error
    }
  },

  async updateTechStack(id, payload) {
    try {
      const data = await apiRequest(`/tech-stacks/update/${id}`, {
        method: 'PUT',
        body: payload
      })
      return data
    } catch (error) {
      console.error('Error updating tech stack:', error)
      throw error
    }
  },

  async deleteTechStack(id) {
    try {
      const data = await apiRequest(`/tech-stacks/destroy/${id}`, {
        method: 'DELETE'
      })
      return data
    } catch (error) {
      console.error('Error deleting tech stack:', error)
      throw error
    }
  }
}
