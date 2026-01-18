<template>
  <section id="about" class="about section">
    <div class="container">
      <h2 class="section-title">Giới thiệu</h2>
      <p class="section-subtitle">
        Tìm hiểu thêm về tôi và những gì tôi làm
      </p>
      
      <div class="about-content">
        <!-- Hình ảnh -->
        <div class="about-image">
          <div class="image-wrapper">
            <div class="avatar-placeholder">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" fill="#6366f1" opacity="0.2"/>
                <circle cx="100" cy="80" r="30" fill="#6366f1"/>
                <path d="M 50 150 Q 100 120 150 150 L 150 200 L 50 200 Z" fill="#6366f1"/>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Nội dung -->
        <div class="about-text">
          <h3>Lập trình viên Full-stack</h3>
          <p>
            Tôi là một lập trình viên đam mê với việc tạo ra những website và ứng dụng web 
            chất lượng cao. Với kinh nghiệm làm việc với Vue.js và Laravel, tôi có thể 
            phát triển cả frontend và backend một cách hiệu quả.
          </p>
          <p>
            Tôi luôn cập nhật những công nghệ mới nhất và áp dụng best practices vào các 
            dự án của mình để đảm bảo code sạch, hiệu năng cao và dễ bảo trì.
          </p>
          
          <!-- Thông tin cá nhân -->
          <div class="info-list">
            <div class="info-item">
              <strong>Họ tên:</strong>
              <span>Your Name</span>
            </div>
            <div class="info-item">
              <strong>Email:</strong>
              <span>your.email@example.com</span>
            </div>
            <div class="info-item">
              <strong>Điện thoại:</strong>
              <span>+84 xxx xxx xxx</span>
            </div>
            <div class="info-item">
              <strong>Địa chỉ:</strong>
              <span>Việt Nam</span>
            </div>
          </div>
          
          <a href="#contact" class="btn btn-primary" style="margin-top: 2rem;">
            Liên hệ với tôi
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about {
  background: var(--bg-color);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: center;
}

.about-image {
  display: flex;
  justify-content: center;
}

.image-wrapper {
  position: relative;
}

.avatar-placeholder {
  width: 300px;
  height: 300px;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 60px rgba(99, 102, 241, 0.2);
}

.avatar-placeholder svg {
  width: 80%;
  height: 80%;
}

.about-text h3 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.about-text p {
  color: var(--text-light);
  line-height: 1.8;
  margin-bottom: 1rem;
}

.info-list {
  margin-top: 2rem;
  display: grid;
  gap: 1rem;
}

.info-item {
  display: flex;
  gap: 1rem;
}

.info-item strong {
  min-width: 120px;
  color: var(--text-color);
}

.info-item span {
  color: var(--text-light);
}

/* Responsive */
@media (max-width: 968px) {
  .about-content {
    grid-template-columns: 1fr;
  }
  
  .about-image {
    order: -1;
  }
  
  .avatar-placeholder {
    width: 250px;
    height: 250px;
  }
}

@media (max-width: 768px) {
  .info-item {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .info-item strong {
    min-width: auto;
  }
}
</style>
