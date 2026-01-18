import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// Tạo ứng dụng Vue và mount vào DOM
createApp(App).use(router).mount('#app')
