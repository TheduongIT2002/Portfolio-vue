<template>
  <section id="contact" class="contact section">
    <div class="container">
      <h2 class="section-title">Liên hệ</h2>
      <p class="section-subtitle">
        Hãy liên hệ với tôi nếu bạn có bất kỳ câu hỏi nào
      </p>
      
      <div class="contact-content">
        <!-- Thông tin liên hệ -->
        <div class="contact-info">
          <h3>Thông tin liên hệ</h3>
          <p>
            Tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy gửi tin nhắn cho tôi 
            hoặc liên hệ qua các kênh sau:
          </p>
          
          <div class="contact-items">
            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h4>Email</h4>
                <p>your.email@example.com</p>
              </div>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <div>
                <h4>Điện thoại</h4>
                <p>+84 xxx xxx xxx</p>
              </div>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <h4>Địa chỉ</h4>
                <p>Việt Nam</p>
              </div>
            </div>
          </div>
          
          <!-- Social links -->
          <div class="social-media">
            <h4>Theo dõi tôi</h4>
            <div class="social-icons">
              <a href="#" aria-label="Facebook" class="social-icon">
                Facebook
              </a>
              <a href="#" aria-label="GitHub" class="social-icon">
                GitHub
              </a>
              <a href="#" aria-label="LinkedIn" class="social-icon">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        
        <!-- Form liên hệ -->
        <div class="contact-form-wrapper">
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">Họ tên *</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name"
                required
                placeholder="Nhập họ tên của bạn"
              />
            </div>
            
            <div class="form-group">
              <label for="email">Email *</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email"
                required
                placeholder="your.email@example.com"
              />
            </div>
            
            <div class="form-group">
              <label for="subject">Chủ đề *</label>
              <input 
                type="text" 
                id="subject" 
                v-model="form.subject"
                required
                placeholder="Chủ đề tin nhắn"
              />
            </div>
            
            <div class="form-group">
              <label for="message">Tin nhắn *</label>
              <textarea 
                id="message" 
                v-model="form.message"
                required
                rows="5"
                placeholder="Nhập tin nhắn của bạn..."
              ></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary">
              Gửi tin nhắn
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      // Dữ liệu form
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    // Xử lý submit form
    handleSubmit() {
      // TODO: Gửi dữ liệu đến backend Laravel
      console.log('Form data:', this.form)
      alert('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.')
      
      // Reset form
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  }
}
</script>

<style scoped>
.contact {
  background: var(--bg-light);
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
}

.contact-info h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.contact-info > p {
  color: var(--text-light);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}

.contact-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.contact-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-icon svg {
  width: 24px;
  height: 24px;
  stroke-width: 2;
  color: white;
}

.contact-item h4 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  color: var(--text-color);
}

.contact-item p {
  color: var(--text-light);
}

.social-media h4 {
  margin-bottom: 1rem;
  color: var(--text-color);
}

.social-icons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-icon {
  padding: 0.75rem 1.5rem;
  background: white;
  color: var(--text-color);
  text-decoration: none;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  font-weight: 500;
}

.social-icon:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.contact-form-wrapper {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: var(--text-color);
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

/* Responsive */
@media (max-width: 968px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}
</style>
