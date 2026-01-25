<template>
  <!-- Section Tech Stack & Tools: giới thiệu công nghệ và công cụ sử dụng -->
  <section id="tech-stack" class="section tech-stack">
    <div class="container">
      <!-- Tiêu đề section -->
      <h2 class="section-title">Tech Stack &amp; Tools</h2>
      <p class="section-subtitle">
        Những công nghệ và công cụ tôi sử dụng để xây dựng các ứng dụng web fullstack
      </p>

      <!-- Lưới các nhóm công nghệ -->
      <div class="stack-grid">
        <!-- Nhóm Frontend -->
        <div class="stack-card" v-scroll-animate="'fade-up'">
          <h3 class="stack-title">Frontend</h3>
          <p class="stack-desc">
            Xây dựng giao diện người dùng hiện đại, responsive và tối ưu trải nghiệm trên nhiều thiết bị.
          </p>
          <ul class="stack-list">
            <li>Vue.js, Vue Router</li>
            <li>JavaScript (ES6+)</li>
            <li>HTML5, CSS3</li>
            <li>Tailwind CSS</li>
            <li>Vite, Axios</li>
          </ul>
        </div>

        <!-- Nhóm Backend & API -->
        <div class="stack-card" v-scroll-animate="'fade-up'">
          <h3 class="stack-title">Backend &amp; API</h3>
          <p class="stack-desc">
            Xử lý logic nghiệp vụ, xây dựng RESTful API và các chức năng bảo mật cơ bản.
          </p>
          <ul class="stack-list">
            <li>PHP, Laravel</li>
            <li>RESTful API, Authentication</li>
            <li>Validation &amp; Authorization</li>
            <li>File upload, xử lý form</li>
          </ul>
        </div>

        <!-- Nhóm Database & DevOps -->
        <div class="stack-card" v-scroll-animate="'fade-up'">
          <h3 class="stack-title">Database &amp; DevOps</h3>
          <p class="stack-desc">
            Thiết kế cấu trúc dữ liệu, tối ưu truy vấn và triển khai môi trường chạy ứng dụng.
          </p>
          <ul class="stack-list">
            <li>MySQL</li>
            <li>Database design, migration</li>
            <li>Basic optimization &amp; indexing</li>
            <li>Docker (development)</li>
          </ul>
        </div>

        <!-- Nhóm Tools & Workflow -->
        <div class="stack-card" v-scroll-animate="'fade-up'">
          <h3 class="stack-title">Tools &amp; Workflow</h3>
          <p class="stack-desc">
            Các công cụ phục vụ phát triển, kiểm thử và cộng tác trong quá trình làm việc.
          </p>
          <ul class="stack-list">
            <li>Git, GitHub / GitLab</li>
            <li>VS Code</li>
            <li>Postman</li>
            <li>Figma</li>
            <li>NPM, Composer</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TechStack'
}
</script>

<style scoped>
/* Nền section nhẹ, tách biệt với các section khác */
.tech-stack {
  background: var(--bg-light);
}

/* Lưới các card tech stack */
.stack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

/* Card hiển thị từng nhóm công nghệ */
.stack-card {
  background: rgba(15, 23, 42, 0.95);
  border-radius: 16px;
  padding: 1.75rem 1.75rem 2rem;
  border: 1px solid rgba(51, 65, 85, 0.9);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.35);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.stack-card:hover {
  transform: translateY(-6px);
  border-color: rgba(56, 189, 248, 0.8);
  box-shadow: 0 22px 55px rgba(15, 23, 42, 0.9);
}

.stack-title {
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: var(--text-color);
}

.stack-desc {
  font-size: 0.95rem;
  color: var(--text-light);
  margin-bottom: 1.25rem;
}

.stack-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stack-list li {
  position: relative;
  padding-left: 1.1rem;
  color: rgba(226, 232, 240, 0.95);
  font-size: 0.95rem;
}

.stack-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55rem;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
}

/* Responsive nhỏ hơn */
@media (max-width: 768px) {
  .stack-card {
    padding: 1.5rem 1.4rem 1.75rem;
  }
}
</style>

