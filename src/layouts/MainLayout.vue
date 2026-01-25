<template>
  <div class="main-layout">
    <!-- Header cho trang chủ -->
    <Header :active-section="activeSection" />
    
    <!-- Router view để hiển thị các trang -->
    <router-view />
    
    <!-- Footer cho trang chủ -->
    <Footer />
  </div>
</template>

<script>
import Header from '../components/main/AppHeader.vue'
import Footer from '../components/main/AppFooter.vue'

export default {
  name: 'MainLayout',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      // Section hiện tại (dùng để highlight menu khi scroll)
      activeSection: 'home'
    }
  },
  mounted() {
    // Theo dõi scroll để xác định section đang active (scrollspy)
    window.addEventListener('scroll', this.handleScroll, { passive: true })

    // Chạy 1 lần khi vừa mount để set trạng thái đúng nếu user refresh giữa trang
    this.handleScroll()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    // Xác định section đang được xem để highlight menu trên Header
    handleScroll() {
      // Danh sách id các section trên trang theo đúng thứ tự xuất hiện
      const sections = ['home', 'about', 'tech-stack', 'projects', 'contact']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (!el) continue

        const top = el.offsetTop
        const bottom = top + el.offsetHeight

        if (scrollPosition >= top && scrollPosition < bottom) {
          this.activeSection = section
          break
        }
      }
    }
  }
}
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
}
</style>
