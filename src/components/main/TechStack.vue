<template>
  <!-- Section Tech Stack & Tools: giới thiệu công nghệ và công cụ sử dụng -->
  <section id="tech-stack" class="section tech-stack">
    <div class="container">
      <!-- Tiêu đề section -->
      <h2 class="section-title">Tech Stack &amp; Tools</h2>
      <p class="section-subtitle">
        Những công nghệ và công cụ tôi sử dụng để xây dựng các ứng dụng web fullstack
      </p>

      <!-- Trạng thái loading / error -->
      <div v-if="loading" class="text-center text-slate-400 mt-6 text-sm">
        Đang tải Tech Stack &amp; Tools...
      </div>
      <div v-else-if="errorMessage" class="text-center text-red-400 mt-6 text-sm">
        {{ errorMessage }}
      </div>

      <!-- Lưới các nhóm công nghệ -->
      <div v-else class="stack-grid">
        <div
          class="stack-card"
          v-for="stack in techStacks"
          :key="stack.id || stack.category"
          v-scroll-animate="'fade-up'"
        >
          <h3 class="stack-title">{{ stack.category }}</h3>
          <p class="stack-desc">
            {{ stack.description }}
          </p>
          <ul class="stack-list">
            <li v-for="item in stack.items || []" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { apiRequest } from '../../services/api'

export default {
  name: 'TechStack',
  data() {
    return {
      techStacks: [],
      loading: false,
      errorMessage: ''
    }
  },
  async mounted() {
    await this.loadTechStacks()
  },
  methods: {
    async loadTechStacks() {
      try {
        this.loading = true
        this.errorMessage = ''

        const res = await apiRequest('/tech-stacks/index')
        const raw = res?.data
        let items = []
        if (Array.isArray(raw)) {
          items = raw
        } else if (Array.isArray(raw?.data)) {
          items = raw.data
        } else {
          items = []
        }

        this.techStacks = items.map((item) => ({
          category: item.category,
          description: item.description,
          items: item.items || []
        }))
      } catch (error) {
        console.error('Failed to load tech stacks for main page:', error)
        this.errorMessage =
          error.response?.data?.message || error.message || 'Không thể tải Tech Stack & Tools.'
      } finally {
        this.loading = false
      }
    }
  }
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

