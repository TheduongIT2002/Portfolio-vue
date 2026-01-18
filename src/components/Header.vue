<template>
  <header class="header">
    <nav class="navbar">
      <div class="container">
        <div class="nav-wrapper">
          <!-- Logo -->
          <div class="logo">
            <a href="#home">Portfolio</a>
          </div>
          
          <!-- Menu navigation -->
          <ul class="nav-menu" :class="{ active: menuOpen }">
            <li><a href="#home" @click="closeMenu">Trang chủ</a></li>
            <li><a href="#about" @click="closeMenu">Giới thiệu</a></li>
            <li><a href="#projects" @click="closeMenu">Dự án</a></li>
            <li><a href="#skills" @click="closeMenu">Kỹ năng</a></li>
            <li><a href="#contact" @click="closeMenu">Liên hệ</a></li>
          </ul>
          
          <!-- Mobile menu toggle -->
          <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
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
  data() {
    return {
      menuOpen: false
    }
  },
  methods: {
    // Toggle menu mobile
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    // Đóng menu khi click vào link
    closeMenu() {
      this.menuOpen = false
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
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
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
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-menu li a:hover {
  color: var(--primary-color);
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

.nav-menu li a:hover::after {
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
  background: var(--text-color);
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
    background: white;
    width: 100%;
    padding: 2rem;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
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
