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
  // Khi dev, dùng Vite proxy (/api -> http://127.0.0.1:8000) để tránh CORS, đặc biệt với multipart/form-data.
  // Có thể override bằng VITE_API_BASE_URL nếu deploy khác môi trường.
  const baseURL = import.meta.env.VITE_API_BASE_URL || '/api'
  const token = localStorage.getItem('token')

  // Kiểm tra xem body có phải là FormData không
  const isFormData = options.body instanceof FormData

  const defaultOptions = {
    headers: {
      // Luôn yêu cầu JSON để Laravel API không redirect về web routes (vd /admin, /login)
      Accept: 'application/json',
      // Không set Content-Type cho FormData, để browser tự set với boundary
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` })
    }
  }

  // Cho phép truyền absolute URL (http://...) mà không bị prefix baseURL
  const isAbsolute = /^https?:\/\//i.test(url)
  const finalUrl = isAbsolute ? url : `${baseURL}${url}`

  // Nếu không phải FormData và body là object, stringify nó
  let body = options.body
  if (!isFormData && body && typeof body === 'object' && !(body instanceof FormData)) {
    body = JSON.stringify(body)
  }

  let response
  try {
    response = await fetch(finalUrl, {
    ...defaultOptions,
    ...options,
    body: body || options.body,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  })
  } catch (err) {
    throw err
  }

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    
    // Thử parse error message từ response
    let errorMessage = response.statusText
    let errorData = {}
    try {
        errorData = await response.json()
        errorMessage = errorData.message || errorData.error || errorMessage
    } catch (e) {
      // Nếu không parse được JSON, dùng statusText
    }
    
    const error = new Error(errorMessage)
    error.response = { status: response.status, data: errorData }
    throw error
  }

    return response.json()
}
