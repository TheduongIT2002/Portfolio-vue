/**
 * Composable cho Scroll Spy
 * Theo dõi section đang được xem khi scroll
 */

import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollSpy(sections = []) {
  const activeSection = ref('home')

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 200

    for (const section of sections) {
      const el = document.getElementById(section)
      if (!el) continue

      const top = el.offsetTop
      const bottom = top + el.offsetHeight

      if (scrollPosition >= top && scrollPosition < bottom) {
        activeSection.value = section
        break
      }
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Chạy 1 lần khi mount
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    activeSection
  }
}
