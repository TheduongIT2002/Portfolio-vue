<template>
  <div class="home">
    <!-- Hero Section -->
    <Hero />
    
    <!-- About Section -->
    <About />
    
    <!-- Projects Section -->
    <Projects />
    
    <!-- Contact Section -->
    <Contact />
  </div>
</template>

<script>
import Hero from '../components/sections/Hero.vue'
import About from '../components/sections/About.vue'
import Projects from '../components/sections/Projects.vue'
import Contact from '../components/sections/Contact.vue'

export default {
  name: 'Home',
  components: {
    Hero,
    About,
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
