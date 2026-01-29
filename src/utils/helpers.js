/**
 * Utility Functions
 * Các hàm tiện ích dùng chung trong ứng dụng
 */

/**
 * Format date theo định dạng Việt Nam
 * @param {Date|string} date - Ngày cần format
 * @returns {string} - Ngày đã format
 */
export const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Format số tiền theo định dạng Việt Nam
 * @param {number} amount - Số tiền
 * @returns {string} - Số tiền đã format
 */
export const formatCurrency = (amount) => {
  if (!amount) return '0 ₫'
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

/**
 * Debounce function
 * @param {Function} func - Hàm cần debounce
 * @param {number} wait - Thời gian chờ (ms)
 * @returns {Function} - Hàm đã debounce
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Scroll smooth đến element
 * @param {string} elementId - ID của element
 */
export const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
