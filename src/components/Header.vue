<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <nav class="navbar">
      <div class="container">
        <div class="nav-wrapper">
          <!-- Logo -->
          <div class="logo">
            <a href="#home">Portfolio</a>
          </div>
          
          <!-- Menu navigation -->
          <ul class="nav-menu" :class="{ active: menuOpen }">
            <li v-for="link in navLinks" :key="link.id">
              <a
                :href="'#' + link.id"
                @click="closeMenu"
                :class="{ active: activeSection === link.id }"
              >
                <span class="nav-number">{{ link.number }}.</span>
                {{ link.label }}
              </a>
            </li>
          </ul>
          
          <!-- Mobile menu toggle -->
          <button
            class="menu-toggle"
            :class="{ active: menuOpen }"
            @click="toggleMenu"
            aria-label="Toggle menu"
            :aria-expanded="menuOpen ? 'true' : 'false'"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    // Section đang active (được tính ở App.vue)
    activeSection: {
      type: String,
      default: 'home'
    }
  },
  data() {
    return {
      menuOpen: false,
      // Trạng thái scroll để đổi style header
      isScrolled: false,
      // Danh sách link menu (đánh số kiểu template)
      navLinks: [
        { id: 'home', label: 'Trang chủ', number: '01' },
        { id: 'about', label: 'Giới thiệu', number: '02' },
        { id: 'skills', label: 'Kỹ năng', number: '03' },
        { id: 'projects', label: 'Dự án', number: '04' },
        { id: 'contact', label: 'Liên hệ', number: '05' }
      ]
    }
  },
  mounted() {
    // Theo dõi scroll để đổi background/độ mờ header
    window.addEventListener('scroll', this.handleHeaderScroll, { passive: true })
    this.handleHeaderScroll()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleHeaderScroll)
  },
  methods: {
    // Toggle menu mobile
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    // Đóng menu khi click vào link
    closeMenu() {
      this.menuOpen = false
    },
    // Cập nhật trạng thái scroll của header
    handleHeaderScroll() {
      this.isScrolled = window.scrollY > 20
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: transparent;
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: background 0.3s ease, border-color 0.3s ease;
  border-bottom: 1px solid transparent;
}

.header.scrolled {
  background: rgba(15, 23, 42, 0.85);
  border-bottom-color: rgba(51, 65, 85, 0.5);
}

.navbar {
  padding: 1rem 0;
}

.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
}

.nav-menu li a {
  color: rgba(148, 163, 184, 0.9);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.95rem;
}

.nav-menu li a:hover {
  color: var(--primary-color);
}

.nav-menu li a.active {
  color: var(--primary-color);
}

.nav-number {
  color: rgba(56, 189, 248, 0.7);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.8rem;
}

.nav-menu li a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-color);
  transition: width 0.3s ease;
}

.nav-menu li a:hover::after,
.nav-menu li a.active::after {
  width: 100%;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background: rgba(226, 232, 240, 0.9);
  transition: all 0.3s ease;
  border-radius: 3px;
}

/* Responsive */
@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }
  
  .nav-menu {
    position: fixed;
    top: 70px;
    left: -100%;
    flex-direction: column;
    background: rgba(15, 23, 42, 0.98);
    width: 100%;
    padding: 2rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
    transition: left 0.3s ease;
    gap: 1.5rem;
  }
  
  .nav-menu.active {
    left: 0;
  }
  
  .menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(8px, 8px);
  }
  
  .menu-toggle.active span:nth-child(2) {
    opacity: 0;
  }
  
  .menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -7px);
  }
}
</style>
