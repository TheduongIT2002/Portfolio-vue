/**
 * Service cho Projects (Main Page)
 * Xử lý các API calls liên quan đến projects cho client
 */

import { apiRequest } from '../api'

export const projectService = {
  // Lấy danh sách projects công khai
  async getPublicProjects() {
    try {
      const data = await apiRequest('/projects/public')
      return data
    } catch (error) {
      console.error('Error fetching public projects:', error)
      throw error
    }
  },

  // Lấy chi tiết một project
  async getProjectById(id) {
    try {
      const data = await apiRequest(`/projects/${id}`)
      return data
    } catch (error) {
      console.error('Error fetching project:', error)
      throw error
    }
  }
}
