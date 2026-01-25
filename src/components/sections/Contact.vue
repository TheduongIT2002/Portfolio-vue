<template>
  <section id="contact" class="contact section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Liên hệ</h2>
      </div>
      <p class="section-subtitle">
        Luôn mở cho cơ hội mới. Cứ nhắn một dòng, tôi sẽ phản hồi sớm nhất.
      </p>
      
      <div class="contact-grid">
        <!-- Cột thông tin + social (animate từ trái) -->
        <div class="contact-panel" v-scroll-animate="'fade-left'">
          <div class="panel-title">Kết nối với tôi</div>
          <p class="panel-desc">
            Email, mạng xã hội, hoặc tải CV bằng QR — chọn kênh bạn thích nhất.
          </p>

          <div class="social-row">
            <a v-for="social in socials" :key="social.name" href="#" class="social-btn">
              <img :src="social.icon" :alt="social.name" />
            </a>
          </div>

          <div class="cv-card">
            <div class="qr-box">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://github.com/duong-dev" alt="QR CV">
            </div>
            <div class="cv-info">
              <p class="cv-text">Quét QR để xem CV hoặc</p>
              <button class="cv-btn">
                <span class="material-symbols-outlined">download</span>
                Tải CV PDF
              </button>
            </div>
          </div>
        </div>

        <!-- Form (animate từ phải) -->
        <div class="form-panel" v-scroll-animate="'fade-right'">
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <input type="text" id="name" v-model="form.name" required placeholder=" " />
              <label for="name">Họ tên *</label>
            </div>

            <div class="form-group">
              <input type="email" id="email" v-model="form.email" required placeholder=" " />
              <label for="email">Email *</label>
            </div>

            <div class="form-group">
              <input type="text" id="subject" v-model="form.subject" required placeholder=" " />
              <label for="subject">Chủ đề *</label>
            </div>

            <div class="form-group">
              <textarea id="message" v-model="form.message" rows="4" required placeholder=" "></textarea>
              <label for="message">Tin nhắn *</label>
            </div>

            <button type="submit" class="btn btn-primary submit-btn">
              <span class="material-symbols-outlined">send</span>
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
      },
      // Social icons
      socials: [
        { name: 'Github', icon: 'https://img.icons8.com/ios-filled/24/ffffff/github.png' },
        { name: 'LinkedIn', icon: 'https://img.icons8.com/ios-filled/24/ffffff/linkedin.png' },
        { name: 'Twitter', icon: 'https://img.icons8.com/ios-filled/24/ffffff/twitter.png' }
      ]
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
  background: var(--bg-color);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.8rem;
}

.contact-panel,
.form-panel {
  background: rgba(17, 24, 39, 0.95);
  border: 1px solid rgba(51, 65, 85, 0.85);
  border-radius: 18px;
  padding: 1.6rem;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;
}

.contact-panel::before {
  content: "";
  position: absolute;
  top: -80px;
  right: -60px;
  width: 220px;
  height: 220px;
  background: rgba(56, 189, 248, 0.08);
  filter: blur(30px);
  border-radius: 50%;
}

.panel-title {
  color: var(--text-color);
  font-weight: 800;
  font-size: 1.3rem;
}

.panel-desc {
  margin: 10px 0 18px;
  color: var(--text-light);
  line-height: 1.7;
}

.social-row {
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
}

.social-btn {
  width: 46px;
  height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(51, 65, 85, 0.8);
  transition: all 0.25s ease;
}

.social-btn:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.cv-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  align-items: center;
  padding: 12px;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(51, 65, 85, 0.8);
  border-radius: 14px;
}

.qr-box {
  background: #fff;
  border-radius: 10px;
  padding: 8px;
  width: 96px;
  height: 96px;
  display: grid;
  place-items: center;
}

.qr-box img {
  width: 80px;
  height: 80px;
}

.cv-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cv-text {
  color: var(--text-light);
  font-size: 0.95rem;
}

.cv-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--primary-color);
  color: #0b1220;
  border: none;
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.25s ease;
}

.cv-btn:hover {
  transform: translateY(-1px);
  background: var(--secondary-color);
}

.form-panel {
  background: rgba(17, 24, 39, 0.96);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-group {
  position: relative;
}

.form-group input,
.form-group textarea {
  width: 100%;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(51, 65, 85, 0.85);
  border-radius: 12px;
  padding: 14px 14px 14px 14px;
  color: var(--text-color);
  font-size: 1rem;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.form-group textarea {
  resize: vertical;
  min-height: 110px;
}

.form-group label {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
  background: transparent;
  padding: 0 4px;
  transition: all 0.2s ease;
  pointer-events: none;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.16);
}

.form-group input:not(:placeholder-shown) + label,
.form-group textarea:not(:placeholder-shown) + label,
.form-group input:focus + label,
.form-group textarea:focus + label {
  top: 10px;
  font-size: 0.8rem;
  color: var(--primary-color);
}

.submit-btn {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 700;
}

/* Responsive */
@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .contact-panel,
  .form-panel {
    padding: 1.2rem;
  }

  .social-row {
    gap: 10px;
  }
}
</style>
