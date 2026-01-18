<template>
  <div id="app">
    <!-- Component Header luôn hiển thị -->
    <Header />
    
    <!-- Router view để hiển thị các trang khác nhau -->
    <router-view />
    
    <!-- Component Footer luôn hiển thị -->
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
}
</style>
