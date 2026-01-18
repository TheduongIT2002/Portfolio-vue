<template>
  <section id="projects" class="projects section">
    <div class="container">
      <h2 class="section-title">Dự án</h2>
      <p class="section-subtitle">
        Một số dự án tôi đã thực hiện
      </p>
      
      <div class="projects-grid">
        <div 
          class="project-card" 
          v-for="project in projects" 
          :key="project.id"
        >
          <div class="project-image">
            <div class="image-placeholder">
              <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#6366f1" opacity="0.1"/>
                <rect x="50" y="50" width="300" height="200" fill="#6366f1" opacity="0.3"/>
                <circle cx="200" cy="150" r="50" fill="#6366f1"/>
              </svg>
            </div>
            <div class="project-overlay">
              <a :href="project.demo" target="_blank" class="project-link" v-if="project.demo">
                Xem demo
              </a>
              <a :href="project.github" target="_blank" class="project-link" v-if="project.github">
                GitHub
              </a>
            </div>
          </div>
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tags">
              <span 
                class="project-tag" 
                v-for="tag in project.tags" 
                :key="tag"
              >
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
          title: 'Website E-commerce',
          description: 'Website bán hàng trực tuyến với đầy đủ tính năng giỏ hàng, thanh toán và quản lý đơn hàng.',
          tags: ['Vue.js', 'Laravel', 'MySQL'],
          demo: '#',
          github: '#'
        },
        {
          id: 2,
          title: 'Hệ thống Quản lý',
          description: 'Hệ thống quản lý với dashboard, báo cáo và phân quyền người dùng.',
          tags: ['Vue.js', 'Laravel', 'REST API'],
          demo: '#',
          github: '#'
        },
        {
          id: 3,
          title: 'Portfolio Website',
          description: 'Website giới thiệu cá nhân với thiết kế hiện đại và responsive.',
          tags: ['Vue.js', 'CSS3', 'Vite'],
          demo: '#',
          github: '#'
        },
        {
          id: 4,
          title: 'Ứng dụng Chat',
          description: 'Ứng dụng chat real-time với WebSocket và Laravel Broadcasting.',
          tags: ['Vue.js', 'Laravel', 'WebSocket'],
          demo: '#',
          github: '#'
        },
        {
          id: 5,
          title: 'Blog Platform',
          description: 'Nền tảng blog với tính năng đăng bài, bình luận và tìm kiếm.',
          tags: ['Vue.js', 'Laravel', 'MySQL'],
          demo: '#',
          github: '#'
        },
        {
          id: 6,
          title: 'Landing Page',
          description: 'Landing page với animation và hiệu ứng đẹp mắt, tối ưu conversion.',
          tags: ['Vue.js', 'CSS3', 'Animation'],
          demo: '#',
          github: '#'
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
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.project-image {
  position: relative;
  height: 250px;
  overflow: hidden;
  background: var(--bg-light);
}

.image-placeholder {
  width: 100%;
  height: 100%;
}

.image-placeholder svg {
  width: 100%;
  height: 100%;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-link {
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
  transition: background 0.3s ease;
}

.project-link:hover {
  background: var(--secondary-color);
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--text-color);
}

.project-description {
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-tag {
  padding: 0.25rem 0.75rem;
  background: var(--bg-light);
  color: var(--primary-color);
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .project-overlay {
    opacity: 1;
  }
}
</style>
