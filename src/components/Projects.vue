<template>
  <section id="projects" class="projects section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Dự án nổi bật</h2>
      </div>
      <p class="section-subtitle">Một vài sản phẩm tôi đã xây dựng gần đây.</p>
      
      <div class="projects-grid">
        <div 
          class="project-card" 
          v-for="project in projects" 
          :key="project.id"
        >
          <div class="project-image">
            <img :src="project.image" :alt="project.title" />
            <div class="project-overlay"></div>
            <div class="project-actions">
              <a v-if="project.github" :href="project.github" target="_blank" class="icon-btn" aria-label="GitHub">
                <span class="material-symbols-outlined">code</span>
              </a>
              <a v-if="project.demo" :href="project.demo" target="_blank" class="icon-btn" aria-label="Demo">
                <span class="material-symbols-outlined">open_in_new</span>
              </a>
            </div>
          </div>
          <div class="project-content">
            <div class="project-top">
              <h3 class="project-title">{{ project.title }}</h3>
              <span class="project-year">{{ project.year }}</span>
            </div>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tags">
              <span class="project-tag" v-for="tag in project.tags" :key="tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Projects',
  data() {
    return {
      // Danh sách các dự án
      projects: [
        {
          id: 1,
          title: 'E-Commerce API',
          description: 'REST API multi-vendor với auth JWT, cổng thanh toán và cập nhật tồn kho realtime.',
          tags: ['Laravel', 'MySQL', 'Redis'],
          demo: '#',
          github: '#',
          image: 'https://picsum.photos/seed/shop-api/600/400',
          year: '2024'
        },
        {
          id: 2,
          title: 'Real-time Chat App',
          description: 'Ứng dụng chat realtime với Vue 3, Laravel Echo, hỗ trợ channel, file sharing, presence.',
          tags: ['Vue 3', 'Pusher', 'Tailwind'],
          demo: '#',
          github: '#',
          image: 'https://picsum.photos/seed/chat-app/600/400',
          year: '2023'
        },
        {
          id: 3,
          title: 'TaskFlow SaaS',
          description: 'Quản lý dự án kiểu kanban, chấm công và báo cáo tự động, build với Inertia.js.',
          tags: ['Laravel', 'Inertia', 'React'],
          demo: '#',
          github: '#',
          image: 'https://picsum.photos/seed/saas/600/400',
          year: '2023'
        }
      ]
    }
  }
}
</script>

<style scoped>
.projects {
  background: var(--bg-color);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.6rem;
}

.project-card {
  background: rgba(17, 24, 39, 0.9);
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(51, 65, 85, 0.8);
  box-shadow: 0 16px 50px rgba(0, 0, 0, 0.35);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.4);
  border-color: rgba(56, 189, 248, 0.4);
}

.project-image {
  position: relative;
  height: 210px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.8));
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.project-actions {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 10px;
}

.icon-btn {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(51, 65, 85, 0.8);
  color: var(--text-color);
  transition: all 0.25s ease;
}

.icon-btn:hover {
  color: var(--primary-color);
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.project-content {
  padding: 1.4rem 1.5rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.project-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-color);
}

.project-year {
  font-size: 0.85rem;
  color: rgba(148, 163, 184, 0.8);
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(51, 65, 85, 0.3);
  border: 1px solid rgba(51, 65, 85, 0.6);
}

.project-description {
  color: var(--text-light);
  line-height: 1.6;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.project-tag {
  padding: 0.35rem 0.8rem;
  background: rgba(56, 189, 248, 0.08);
  color: var(--primary-color);
  border-radius: 14px;
  font-size: 0.82rem;
  font-weight: 600;
  border: 1px solid rgba(56, 189, 248, 0.18);
}

/* Responsive */
@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
