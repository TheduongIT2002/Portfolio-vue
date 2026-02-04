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
              <input type="tel" id="phone" v-model="form.phone" placeholder=" " />
              <label for="phone">Số điện thoại</label>
            </div>

            <div class="form-group">
              <textarea id="message" v-model="form.message" rows="4" required placeholder=" "></textarea>
              <label for="message">Tin nhắn *</label>
            </div>

            <button type="submit" class="btn btn-primary submit-btn" :disabled="submitting">
              <span class="material-symbols-outlined" v-if="!submitting">send</span>
              <span class="material-symbols-outlined spin" v-else>sync</span>
              {{ submitting ? 'Đang gửi...' : 'Gửi tin nhắn' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Success Modal -->
      <transition name="fade">
        <div v-if="showSuccessModal" class="success-backdrop" @click.self="closeSuccessModal">
          <div class="success-modal" v-scroll-animate="'fade-up'">
            <div class="success-icon">
              <span class="material-symbols-outlined">check_circle</span>
            </div>
            <h3 class="success-title">Đã gửi thành công</h3>
            <p class="success-message">
              {{ successMessage || 'Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.' }}
            </p>
            <button class="btn btn-primary success-btn" @click="closeSuccessModal">
              Đóng
            </button>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import { apiRequest } from '../../services/api'

export default {
  name: 'Contact',
  data() {
    return {
      // Dữ liệu form
      form: {
        name: '',
        email: '',
        subject: '',
        phone: '',
        message: ''
      },
      submitting: false,
      showSuccessModal: false,
      successMessage: '',
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
    async handleSubmit() {
      if (!this.form.name || !this.form.email || !this.form.subject || !this.form.message) {
        alert('Vui lòng điền đầy đủ Họ tên, Email, Chủ đề và Tin nhắn.')
        return
      }

      this.submitting = true

      try {
        const payload = {
          name: this.form.name,
          email: this.form.email,
          subject: this.form.subject,
          phone: this.form.phone || '',
          message: this.form.message,
          source: 'portfolio',
          status: 'new'
        }

        const res = await apiRequest('/contacts/store', {
          method: 'POST',
          body: payload
        })

        const msg = res?.message || 'Cảm ơn đã gửi thông tin cho em ạ! Em sẽ phản hồi sớm nhất có thể.'
        this.successMessage = msg
        this.showSuccessModal = true

        // Reset form
        this.form = {
          name: '', 
          email: '',
          subject: '',
          phone: '',
          message: ''
        }
      } catch (error) {
        console.error('Error submitting contact form:', error)
        const msg = error.response?.data?.message || error.message || 'Có lỗi xảy ra khi gửi thông tin liên hệ.'
        alert(msg)
      } finally {
        this.submitting = false
      }
    },
    closeSuccessModal() {
      this.showSuccessModal = false
      this.successMessage = ''
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

.submit-btn[disabled] {
  opacity: 0.7;
  cursor: not-allowed;
}

.spin {
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Success Modal */
.success-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1.5rem;
}

.success-modal {
  max-width: 420px;
  width: 100%;
  background: rgba(15, 23, 42, 0.98);
  border-radius: 18px;
  padding: 1.8rem 1.6rem 1.6rem;
  border: 1px solid rgba(16, 185, 129, 0.45);
  box-shadow: 0 24px 80px rgba(16, 185, 129, 0.25);
  text-align: center;
}

.success-icon {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  margin: 0 auto 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 185, 129, 0.12);
  color: rgb(16, 185, 129);
}

.success-icon .material-symbols-outlined {
  font-size: 32px;
}

.success-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.success-message {
  font-size: 0.95rem;
  color: var(--text-light);
  margin-bottom: 1.2rem;
}

.success-btn {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
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
