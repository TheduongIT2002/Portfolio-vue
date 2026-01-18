<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- Thông tin liên hệ -->
        <div class="footer-section">
          <h3>Portfolio</h3>
          <p>Website giới thiệu cá nhân và các dự án đã thực hiện</p>
        </div>
        
        <!-- Links nhanh -->
        <div class="footer-section">
          <h4>Liên kết nhanh</h4>
          <ul>
            <li><a href="#home">Trang chủ</a></li>
            <li><a href="#about">Giới thiệu</a></li>
            <li><a href="#projects">Dự án</a></li>
            <li><a href="#contact">Liên hệ</a></li>
          </ul>
        </div>
        
        <!-- Social media -->
        <div class="footer-section">
          <h4>Theo dõi</h4>
          <div class="social-links">
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="GitHub">GitHub</a>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
          </div>
        </div>
      </div>
      
      <!-- Copyright -->
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Portfolio. Tất cả quyền được bảo lưu.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    // Lấy năm hiện tại
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  background: var(--text-color);
  color: white;
  padding: 3rem 0 1rem;
  margin-top: 4rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-section h4 {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.footer-section p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul li a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: var(--primary-color);
}

.social-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  transition: all 0.3s ease;
}

.social-links a:hover {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>
