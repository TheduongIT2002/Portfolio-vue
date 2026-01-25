import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// Tạo ứng dụng Vue
const app = createApp(App)

// Directive dùng để animate khi scroll tới (IntersectionObserver)
// Cách dùng: v-scroll-animate="'fade-up'" hoặc v-scroll-animate="'fade-left'"
app.directive('scroll-animate', {
  mounted(el, binding) {
    // Luôn gắn class base để áp dụng style mặc định
    el.classList.add('scroll-animate')

    // Nếu có truyền type (fade-up, fade-left, fade-right) thì thêm modifier
    const type = binding.value
    if (typeof type === 'string' && type.length > 0) {
      el.classList.add(`scroll-animate--${type}`)
    }

    // Quan sát khi phần tử xuất hiện trong viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Khi phần tử vào vùng nhìn thấy -> thêm class để bật animation
            el.classList.add('is-visible')
            observer.unobserve(el)
          }
        })
      },
      {
        // Ngưỡng hiển thị ~15% chiều cao phần tử
        threshold: 0.15
      }
    )

    observer.observe(el)
  }
})

// Mount ứng dụng
app.use(router).mount('#app')
