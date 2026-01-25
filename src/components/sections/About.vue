<template>
  <section id="about" class="about section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Giới thiệu</h2>
      </div>
      <p class="section-subtitle">
        Vài dòng về hành trình code và những công nghệ tôi đang sử dụng.
      </p>
      
      <div class="about-grid">
        <!-- Text (slide nhẹ từ trái vào khi scroll) -->
        <div class="about-text" v-scroll-animate="'fade-left'">
          <h3 class="about-heading">Full-stack Developer</h3>
          <p>
            Xin chào! Tôi là <strong class="text-strong">Dương</strong>, thích xây các sản phẩm web
            giàu tương tác. Tôi tập trung vào code sạch, kiến trúc rõ ràng và trải nghiệm mượt.
          </p>
          <p>
            Gần đây tôi làm nhiều với <span class="text-strong">Laravel</span> ở backend,
            <span class="text-strong">Vue 3</span> ở frontend, kết hợp CI/CD và tối ưu hiệu năng.
          </p>
          <p class="about-note">Một vài kỹ năng đang dùng:</p>
          <ul class="about-list">
            <li>PHP / Laravel 10+</li>
            <li>Vue 3 / Nuxt, Vite</li>
            <li>TypeScript, Tailwind CSS</li>
            <li>MySQL, Redis, Docker</li>
          </ul>
        </div>

        <!-- Code card + tech stack (slide nhẹ từ phải vào khi scroll) -->
        <div class="about-panel" v-scroll-animate="'fade-right'">
          <div class="code-card">
            <div class="code-card-header">
              <div class="dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <span class="filename">duong_profile.json</span>
            </div>
            <pre class="code-block">
<span class="token-keyword">const</span> developer = { 
  name: 'Dương',
  role: 'Full Stack Dev',
  skills: {
    frontend: ['Vue', 'React', 'Tailwind'],
    backend: ['Laravel', 'Node', 'MySQL'],
    tools: ['Git', 'Docker', 'Figma']
  },
  coffeeIntake: '∞' // ☕
};
            </pre>
          </div>

          <div class="tech-grid">
            <div class="tech-item" v-for="tech in techStack" :key="tech.name">
              <div class="tech-icon">
                <img :src="tech.icon" :alt="tech.name">
              </div>
              <span class="tech-label">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      // Danh sách tech stack hiển thị dạng icon
      techStack: [
        { name: 'Laravel', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg' },
        { name: 'Vue', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg' },
        { name: 'React', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg' },
        { name: 'PHP', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg' },
        { name: 'MySQL', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg' }
      ]
    }
  }
}
</script>

<style scoped>
.about {
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.95));
}

.about-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 2.8rem;
  align-items: start;
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: var(--text-light);
  font-size: 1.02rem;
  line-height: 1.8;
}

.about-heading {
  color: var(--text-color);
  font-size: 1.9rem;
  margin-bottom: 4px;
}

.text-strong {
  color: var(--text-color);
  font-weight: 700;
}

.about-note {
  margin-top: 8px;
  color: rgba(148, 163, 184, 0.9);
}

.about-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 4px 0 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.95rem;
}

.about-list li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.about-list li::before {
  content: '▹';
  color: var(--primary-color);
  font-size: 0.8rem;
}

.about-panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.code-card {
  background: rgba(17, 24, 39, 0.9);
  border: 1px solid rgba(51, 65, 85, 0.8);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
}

.code-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: rgba(30, 41, 59, 0.8);
  border-bottom: 1px solid rgba(51, 65, 85, 0.8);
}

.dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  opacity: 0.8;
}
.dot.red { background: #f87171; }
.dot.yellow { background: #fbbf24; }
.dot.green { background: #34d399; }

.filename {
  font-size: 0.75rem;
  color: rgba(148, 163, 184, 0.85);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.code-block {
  padding: 16px 18px 18px;
  color: #e2e8f0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.95rem;
  line-height: 1.7;
  overflow-x: auto;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.95));
}

.token-keyword { color: var(--primary-color); }

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 14px;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: rgba(17, 24, 39, 0.8);
  border: 1px solid rgba(51, 65, 85, 0.8);
  border-radius: 12px;
  padding: 12px 10px;
  transition: all 0.25s ease;
}

.tech-item:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.tech-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
}

.tech-icon img {
  width: 32px;
  height: 32px;
  filter: grayscale(0.1);
}

.tech-label {
  font-size: 0.8rem;
  color: rgba(148, 163, 184, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* Responsive */
@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .about-panel {
    order: -1;
  }

  .about-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .code-block {
    font-size: 0.9rem;
  }
}
</style>
