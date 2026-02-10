/**
 * Service cho Personal Info (Main Page)
 * Xử lý các API calls liên quan đến thông tin cá nhân cho client
 */

import { apiRequest } from '../api'

export const personalService = {
  // Lấy thông tin cá nhân
  async getPersonalInfo() {
    try {
      const data = await apiRequest('/personal-info/show')
      return data
    } catch (error) {
      console.error('Error fetching personal info:', error)
      throw error
    }
  }
}
