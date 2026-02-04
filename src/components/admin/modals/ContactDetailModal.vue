<template>
  <!-- Backdrop -->
  <Transition name="modal-backdrop">
    <div 
      v-if="isOpen"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click.self="handleClose"
    >
      <!-- Modal Container -->
      <Transition name="modal-content">
        <div 
          v-if="isOpen && contact"
          class="bg-surface-dark rounded-2xl border border-border-dark shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          <!-- Header -->
          <div class="px-6 py-5 border-b border-border-dark bg-slate-800/30 flex items-center justify-between">
            <div>
              <h3 class="text-xl font-extrabold text-white">
                Chi tiết liên hệ
              </h3>
              <p class="text-xs text-slate-400 mt-1 font-medium">
                Thông tin từ {{ contact.name }}
              </p>
            </div>
            <button 
              @click="handleClose"
              class="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
            >
              <span class="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          <!-- Content (Scrollable) -->
          <div class="flex-1 overflow-y-auto">
            <div class="px-6 py-6 space-y-6">
              <!-- Status Badge -->
              <div class="flex items-center justify-between">
                <span 
                  :class="`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${
                    contact.status === 'new' 
                      ? 'bg-amber-500/20 text-amber-400' 
                      : contact.status === 'read'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-slate-500/20 text-slate-400'
                  }`"
                >
                  <span class="material-symbols-outlined text-[14px]">
                    {{ contact.status === 'new' ? 'mark_email_unread' : 'mark_email_read' }}
                  </span>
                  {{ contact.status === 'new' ? 'Chưa đọc' : contact.status === 'read' ? 'Đã đọc' : contact.status }}
                </span>
                <button
                  v-if="contact.status === 'new'"
                  @click="handleMarkAsRead"
                  class="px-4 py-2 bg-green-500/20 text-green-400 rounded-xl font-bold text-sm hover:bg-green-500/30 transition-all flex items-center gap-2"
                >
                  <span class="material-symbols-outlined text-[18px]">done</span>
                  Đánh dấu đã đọc
                </button>
              </div>

              <!-- Contact Info Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Name -->
                <div>
                  <label class="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Họ tên
                  </label>
                  <p class="text-sm font-bold text-white">{{ contact.name }}</p>
                </div>

                <!-- Email -->
                <div>
                  <label class="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Email
                  </label>
                  <a :href="`mailto:${contact.email}`" class="text-sm text-primary hover:underline">
                    {{ contact.email }}
                  </a>
                </div>

                <!-- Phone -->
                <div v-if="contact.phone">
                  <label class="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Số điện thoại
                  </label>
                  <a :href="`tel:${contact.phone}`" class="text-sm text-primary hover:underline">
                    {{ contact.phone }}
                  </a>
                </div>

                <!-- Source -->
                <div>
                  <label class="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Nguồn
                  </label>
                  <p class="text-sm text-slate-300">{{ contact.source || 'portfolio' }}</p>
                </div>

                <!-- Created At -->
                <div class="md:col-span-2">
                  <label class="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Ngày gửi
                  </label>
                  <p class="text-sm text-slate-300">{{ formatDateTime(contact.created_at) }}</p>
                </div>
              </div>

              <!-- Subject -->
              <div>
                <label class="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Chủ đề
                </label>
                <p class="text-sm font-bold text-white">{{ contact.subject }}</p>
              </div>

              <!-- Message -->
              <div>
                <label class="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Tin nhắn
                </label>
                <div class="mt-2 p-4 bg-slate-800/50 border border-border-dark rounded-xl">
                  <p class="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {{ contact.message }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="px-6 py-5 border-t border-border-dark bg-slate-800/20 flex items-center justify-end gap-3">
            <button
              type="button"
              @click="handleClose"
              class="px-6 py-2.5 border border-border-dark rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
            >
              Đóng
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'ContactDetailModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    contact: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'mark-read'],
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleMarkAsRead() {
      this.$emit('mark-read', this.contact)
    },
    formatDateTime(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
/* Modal Backdrop Animation */
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

/* Modal Content Animation */
.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.3s ease;
}

.modal-content-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}

.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}

/* Custom Scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.5);
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(56, 189, 248, 0.3);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(56, 189, 248, 0.5);
}
</style>
