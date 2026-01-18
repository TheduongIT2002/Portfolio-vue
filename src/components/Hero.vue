<template>
  <section id="home" class="hero">
    <div class="container">
      <div class="hero-content">
        <!-- Nội dung chính -->
        <div class="hero-text">
          <h1 class="hero-title">
            Xin chào, tôi là <span class="highlight">Lập trình viên</span>
          </h1>
          <p class="hero-subtitle">
            Chuyên phát triển website và ứng dụng web với Vue.js và Laravel
          </p>
          <div class="hero-buttons">
            <a href="#projects" class="btn btn-primary">Xem dự án</a>
            <a href="#contact" class="btn btn-outline">Liên hệ</a>
          </div>
        </div>
        
        <!-- Avatar hoặc hình ảnh -->
        <div class="hero-image">
          <div class="avatar-placeholder">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" fill="#6366f1" opacity="0.2"/>
              <circle cx="100" cy="80" r="30" fill="#6366f1"/>
              <path d="M 50 150 Q 100 120 150 150 L 150 200 L 50 200 Z" fill="#6366f1"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero'
}
</script>

<style scoped>
.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f9fafb 0%, #e0e7ff 100%);
  padding: 100px 0 80px;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-text {
  animation: fadeInUp 0.8s ease;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.hero-title .highlight {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  line-height: 1.8;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeInRight 0.8s ease;
}

.avatar-placeholder {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 60px rgba(99, 102, 241, 0.3);
}

.avatar-placeholder svg {
  width: 80%;
  height: 80%;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 968px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-image {
    order: -1;
  }
  
  .avatar-placeholder {
    width: 250px;
    height: 250px;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .avatar-placeholder {
    width: 200px;
    height: 200px;
  }
}
</style>
