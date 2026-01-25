<template>
  <div class="home">
    <!-- Hero Section -->
    <Hero />
    
    <!-- About Section -->
    <About />
    
    <!-- Tech Stack & Tools Section -->
    <!-- Section giới thiệu công nghệ & công cụ dùng để làm fullstack -->
    <TechStack />
    
    <!-- Projects Section -->
    <Projects />
    
    <!-- Contact Section -->
    <Contact />
  </div>
</template>

<script>
// Import các section chính của trang Home
import Hero from '../../components/main/Hero.vue'
import About from '../../components/main/About.vue'
import TechStack from '../../components/main/TechStack.vue'
import Projects from '../../components/main/Projects.vue'
import Contact from '../../components/main/Contact.vue'

export default {
  name: 'Home',
  components: {
    Hero,
    About,
    TechStack,
    Projects,
    Contact
  }
}
</script>

<style scoped>
.home {
  padding-top: 70px; /* Để tránh bị che bởi fixed header */
}
</style>
