<template>
  <div class="home">
    <!-- Hero Section -->
    <Hero />
    
    <!-- About Section -->
    <About />
    
    <!-- Skills Section -->
    <Skills />
    
    <!-- Projects Section -->
    <Projects />
    
    <!-- Contact Section -->
    <Contact />
  </div>
</template>

<script>
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Skills from '../components/Skills.vue'
import Projects from '../components/Projects.vue'
import Contact from '../components/Contact.vue'

export default {
  name: 'Home',
  components: {
    Hero,
    About,
    Skills,
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
