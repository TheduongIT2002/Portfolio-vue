<template>
  <section id="home" class="hero">
    <!-- Nền code-rain (canvas) -->
    <DigitalCodeRain class="hero-rain" />

    <!-- Gradient/mesh overlay để đúng tông xanh lam + tím nhạt -->
    <div class="hero-mesh" aria-hidden="true"></div>

    <div class="hero-blob"></div>
    <div class="container hero-grid">
      <!-- Nội dung chính (animate khi load/scroll tới) -->
      <div class="hero-text" v-scroll-animate="'fade-up'">
        <div class="hero-badge">
          <span class="dot"></span>
          Available for freelance work
        </div>

        <h1 class="hero-title">
          Hi, tôi là <span class="text-primary">Dương</span>.
          <br />
          <span class="hero-subtitle-strong">Laravel &amp; Vue Architect.</span>
        </h1>

        <p class="hero-desc">
          Xây dựng backend scalable và frontend tương tác. Ưu tiên clean code,
          tối ưu hiệu năng và giải quyết bài toán phức tạp.
        </p>

        <div class="hero-actions">
          <a href="#projects" class="btn btn-primary hero-btn">
            Xem dự án
            <span class="material-symbols-outlined icon-inline">arrow_forward</span>
          </a>
          <a href="#contact" class="btn btn-outline hero-btn">
            Liên hệ
          </a>
        </div>

        <div class="hero-social">
          <a href="#" class="social-icon" aria-label="Github">
            <img src="https://img.icons8.com/ios-filled/24/ffffff/github.png" alt="Github">
          </a>
          <a href="#" class="social-icon" aria-label="LinkedIn">
            <img src="https://img.icons8.com/ios-filled/24/ffffff/linkedin.png" alt="LinkedIn">
          </a>
          <a href="#" class="social-icon" aria-label="Twitter">
            <img src="https://img.icons8.com/ios-filled/24/ffffff/twitter.png" alt="Twitter">
          </a>
        </div>
      </div>

      <!-- Ảnh avatar + badge công nghệ (animate từ phải sang) -->
      <div class="hero-visual" v-scroll-animate="'fade-right'">
        <div class="avatar-frame">
          <img
            src="https://picsum.photos/seed/dev-portrait/800/800"
            alt="Developer Portrait"
            class="avatar-img"
          />
          <div class="floating-badge badge-laravel">
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg" alt="Laravel">
          </div>
          <div class="floating-badge badge-vue">
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg" alt="Vue">
          </div>
          <div class="pulse-ring"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DigitalCodeRain from '../common/DigitalCodeRain.vue'

export default {
  name: 'Hero',
  components: { DigitalCodeRain }
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding: 120px 0 80px;
  background:
    radial-gradient(circle at 18% 18%, rgba(59, 130, 246, 0.20), transparent 38%),
    radial-gradient(circle at 85% 12%, rgba(167, 139, 250, 0.18), transparent 40%),
    radial-gradient(circle at 60% 90%, rgba(56, 189, 248, 0.10), transparent 42%),
    linear-gradient(180deg, rgba(2, 6, 23, 0.96), rgba(2, 6, 23, 0.92));
  overflow: hidden;
}

.hero-rain {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 1;
  mix-blend-mode: screen;
}

.hero-mesh {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.10), transparent 40%),
    radial-gradient(circle at 78% 22%, rgba(167, 139, 250, 0.10), transparent 44%),
    linear-gradient(180deg, rgba(2, 6, 23, 0.35), rgba(2, 6, 23, 0.70));
}

.hero-blob {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 600px;
  background: rgba(56, 189, 248, 0.10);
  filter: blur(120px);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1;
}

.hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3.5rem;
  align-items: center;
  z-index: 2;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.2);
  color: var(--primary-color);
  font-size: 0.85rem;
  font-weight: 600;
}

.hero-badge .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary-color);
  box-shadow: 0 0 0 6px rgba(56, 189, 248, 0.18);
}

.hero-title {
  font-size: 3.2rem;
  line-height: 1.15;
  font-weight: 800;
  color: var(--text-color);
}

.hero-subtitle-strong {
  color: #cbd5e1;
  font-weight: 700;
  font-size: 2.4rem;
}

.hero-desc {
  color: var(--text-light);
  font-size: 1.05rem;
  line-height: 1.8;
  max-width: 580px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 4px;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.icon-inline {
  font-size: 18px;
}

.hero-social {
  display: flex;
  gap: 14px;
  margin-top: 8px;
  opacity: 0.7;
  transition: opacity 0.25s ease;
}

.hero-social:hover {
  opacity: 1;
}

.social-icon {
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(51, 65, 85, 0.8);
  transition: all 0.25s ease;
}

.social-icon:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.avatar-frame {
  position: relative;
  width: 320px;
  height: 320px;
  border-radius: 22px; /* vuông bo nhẹ cho hiện đại */
  /* Cho phép badge nổi ra ngoài nhưng vẫn giữ ảnh bo tròn */
  overflow: visible;
  border: 1px solid rgba(51, 65, 85, 0.55);
  background: rgba(2, 6, 23, 0.55);
  box-shadow: 
    0 24px 80px rgba(0, 0, 0, 0.35),
    inset 0 0 0 1px rgba(148, 163, 184, 0.08);
}

/* Line chạy vòng border */
.avatar-frame::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 24px;
  background:
    conic-gradient(
      from 0deg,
      rgba(56, 189, 248, 0) 0deg,
      rgba(56, 189, 248, 0.95) 40deg,
      rgba(167, 139, 250, 0.95) 80deg,
      rgba(56, 189, 248, 0) 120deg,
      rgba(56, 189, 248, 0) 360deg
    );
  filter: blur(0.2px);
  opacity: 0.95;
  animation: border-spin 3.2s linear infinite;
  pointer-events: none;
  /* tạo stroke mỏng (chừa phần ruột) */
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  padding: 2px;
}

/* Glow nhẹ phía ngoài để nhìn “neon” hơn */
.avatar-frame::after {
  content: '';
  position: absolute;
  inset: -10px;
  border-radius: 30px;
  background: radial-gradient(circle at 30% 20%, rgba(56, 189, 248, 0.20), transparent 55%),
              radial-gradient(circle at 80% 80%, rgba(167, 139, 250, 0.16), transparent 55%);
  filter: blur(14px);
  opacity: 0.75;
  z-index: -1;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.2);
  transition: filter 0.5s ease;
  border-radius: 20px;
  overflow: hidden;
}

.avatar-frame:hover .avatar-img {
  filter: grayscale(0);
}

.floating-badge {
  position: absolute;
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: rgba(17, 24, 39, 0.92);
  border: 1px solid rgba(51, 65, 85, 0.9);
  display: grid;
  place-items: center;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  animation: float 4s ease-in-out infinite;
}

.floating-badge img {
  width: 36px;
  height: 36px;
  filter: grayscale(0.1);
}

.badge-laravel {
  top: 12px;
  right: 12px;
}

.badge-vue {
  bottom: 20px;
  left: 12px;
  animation-delay: 0.9s;
}

.pulse-ring {
  position: absolute;
  inset: 0;
  border-radius: 22px;
  border: 1px solid rgba(56, 189, 248, 0.18);
  animation: pulse 2.5s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.9; }
  100% { transform: scale(1.08); opacity: 0; }
}

@keyframes border-spin {
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-text {
    align-items: center;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-social {
    justify-content: center;
  }

  .hero-title {
    font-size: 2.6rem;
  }

  .hero-subtitle-strong {
    font-size: 2rem;
  }
}

@media (max-width: 640px) {
  .hero {
    padding: 100px 0 60px;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle-strong {
    font-size: 1.7rem;
  }

  .avatar-frame {
    width: 260px;
    height: 260px;
  }
}
</style>
