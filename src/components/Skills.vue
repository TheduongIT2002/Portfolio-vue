<template>
  <section id="skills" class="skills section">
    <div class="container">
      <h2 class="section-title">Kỹ năng</h2>
      <p class="section-subtitle">
        Các công nghệ và công cụ tôi sử dụng trong công việc
      </p>
      
      <div class="skills-grid">
        <!-- Frontend Skills -->
        <div class="skill-category">
          <h3>Frontend</h3>
          <div class="skill-items">
            <div class="skill-item" v-for="skill in frontendSkills" :key="skill.name">
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-level">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Backend Skills -->
        <div class="skill-category">
          <h3>Backend</h3>
          <div class="skill-items">
            <div class="skill-item" v-for="skill in backendSkills" :key="skill.name">
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-level">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Tools & Others -->
        <div class="skill-category">
          <h3>Công cụ & Khác</h3>
          <div class="skill-tags">
            <span class="skill-tag" v-for="tool in tools" :key="tool">{{ tool }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Skills',
  data() {
    return {
      // Kỹ năng Frontend
      frontendSkills: [
        { name: 'Vue.js', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Tailwind CSS', level: 80 },
        { name: 'React', level: 70 }
      ],
      // Kỹ năng Backend
      backendSkills: [
        { name: 'Laravel', level: 85 },
        { name: 'PHP', level: 80 },
        { name: 'MySQL', level: 75 },
        { name: 'RESTful API', level: 85 },
        { name: 'Git', level: 90 }
      ],
      // Công cụ khác
      tools: [
        'VS Code',
        'Git',
        'Postman',
        'Figma',
        'Docker',
        'NPM/Yarn',
        'Composer'
      ]
    }
  }
}
</script>

<style scoped>
.skills {
  background: var(--bg-light);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.skill-category {
  background: rgba(17, 24, 39, 0.9);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(51, 65, 85, 0.8);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
}

.skill-category h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  text-align: center;
}

.skill-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-name {
  font-weight: 600;
  color: var(--text-color);
}

.skill-level {
  color: var(--text-light);
  font-size: 0.9rem;
}

.skill-bar {
  height: 8px;
  background: rgba(51, 65, 85, 0.6);
  border-radius: 10px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 10px;
  transition: width 1s ease;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-tag {
  padding: 0.5rem 1rem;
  background: rgba(17, 24, 39, 0.9);
  border-radius: 20px;
  color: var(--text-color);
  font-size: 0.9rem;
  border: 1px solid rgba(51, 65, 85, 0.8);
  transition: all 0.3s ease;
}

.skill-tag:hover {
  background: var(--primary-color);
  color: #0b1220;
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
