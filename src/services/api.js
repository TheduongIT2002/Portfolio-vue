/**
 * Base API Service
 * Cấu hình axios hoặc fetch cho các API calls
 */

// Ví dụ sử dụng axios (cần cài: npm install axios)
// import axios from 'axios'

// Tạo axios instance
// const apiClient = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })

// // Request interceptor để thêm token
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error)
// )

// // Response interceptor để xử lý lỗi
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Xử lý unauthorized
//       localStorage.removeItem('token')
//       window.location.href = '/login'
//     }
//     return Promise.reject(error)
//   }
// )

// export default apiClient

// Hoặc sử dụng fetch API
export const apiRequest = async (url, options = {}) => {
  // Base URL mặc định cho Laravel API local
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'
  const token = localStorage.getItem('token')

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  }

  // Cho phép truyền absolute URL (http://...) mà không bị prefix baseURL
  const isAbsolute = /^https?:\/\//i.test(url)
  const finalUrl = isAbsolute ? url : `${baseURL}${url}`

  const response = await fetch(finalUrl, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  })

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    throw new Error(`API Error: ${response.statusText}`)
  }

  return response.json()
}
