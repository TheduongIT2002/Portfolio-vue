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
          v-if="isOpen"
          class="bg-surface-dark rounded-2xl border border-border-dark shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          <!-- Header -->
          <div class="px-6 py-5 border-b border-border-dark bg-slate-800/30 flex items-center justify-between">
            <div>
              <h3 class="text-xl font-extrabold text-white">
                {{ isEditMode ? 'Chỉnh sửa Tech Stack' : 'Thêm Tech Stack mới' }}
              </h3>
              <p class="text-xs text-slate-400 mt-1 font-medium">
                {{ isEditMode ? 'Cập nhật nhóm công nghệ / tools' : 'Tạo nhóm công nghệ / tools mới' }}
              </p>
            </div>
            <button
              @click="handleClose"
              class="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
            >
              <span class="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="flex-1 overflow-y-auto">
            <div class="px-6 py-6 space-y-6">
              <!-- Category -->
              <div>
                <label class="block text-sm font-bold text-slate-300 mb-2">
                  Tên nhóm <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="formData.category"
                  type="text"
                  required
                  placeholder="Ví dụ: Frontend, Backend & API, Tools & Workflow..."
                  class="w-full px-4 py-3 bg-slate-800/50 border border-border-dark rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <!-- Description -->
              <div>
                <label class="block text-sm font-bold text-slate-300 mb-2">
                  Mô tả <span class="text-red-400">*</span>
                </label>
                <textarea
                  v-model="formData.description"
                  required
                  rows="3"
                  placeholder="Mô tả ngắn gọn về vai trò của nhóm tech stack này..."
                  class="w-full px-4 py-3 bg-slate-800/50 border border-border-dark rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

              <!-- Items -->
              <div>
                <label class="block text-sm font-bold text-slate-300 mb-2">
                  Danh sách items <span class="text-red-400">*</span>
                </label>
                <div class="flex flex-wrap gap-2 mb-3">
                  <span
                    v-for="(item, index) in formData.items"
                    :key="index"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/20 text-primary rounded-lg text-xs font-bold"
                  >
                    {{ item }}
                    <button
                      type="button"
                      @click="removeItem(index)"
                      class="hover:text-red-400 transition-colors"
                    >
                      <span class="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </span>
                </div>
                <div class="flex gap-2">
                  <input
                    v-model="newItem"
                    type="text"
                    placeholder="Ví dụ: Vue.js, Laravel, Git..."
                    @keyup.enter.prevent="addItem"
                    class="flex-1 px-4 py-3 bg-slate-800/50 border border-border-dark rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    @click="addItem"
                    class="px-4 py-3 bg-primary/20 text-primary rounded-xl font-bold text-sm hover:bg-primary/30 transition-all"
                  >
                    <span class="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>
                <p class="text-xs text-slate-500 mt-1.5">Nhấn Enter hoặc nút Add để thêm item.</p>
              </div>

              <!-- Error -->
              <div v-if="errorMessage" class="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p class="text-sm text-red-400 font-medium">{{ errorMessage }}</p>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-6 py-5 border-t border-border-dark bg-slate-800/20 flex items-center justify-end gap-3">
              <button
                type="button"
                @click="handleClose"
                class="px-6 py-2.5 border border-border-dark rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
              >
                Hủy
              </button>
              <button
                type="submit"
                :disabled="submitting"
                class="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-glow hover:bg-blue-500 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center gap-2"
              >
                <span v-if="submitting" class="material-symbols-outlined text-[18px] animate-spin">sync</span>
                <span>{{ submitting ? 'Đang lưu...' : (isEditMode ? 'Cập nhật' : 'Tạo mới') }}</span>
              </button>
            </div>
          </form>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script>
import { adminService } from '../../../services/admin/adminService'

export default {
  name: 'TechStackModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    stack: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'success'],
  data() {
    return {
      formData: {
        category: '',
        description: '',
        items: []
      },
      newItem: '',
      submitting: false,
      errorMessage: ''
    }
  },
  computed: {
    isEditMode() {
      return !!(this.stack && this.stack.id)
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.resetForm()
        if (this.stack) {
          this.loadStackData()
        }
      }
    }
  },
  methods: {
    resetForm() {
      this.formData = {
        category: '',
        description: '',
        items: []
      }
      this.newItem = ''
      this.errorMessage = ''
      this.submitting = false
    },
    loadStackData() {
      if (!this.stack) return
      this.formData = {
        category: this.stack.category || '',
        description: this.stack.description || '',
        items: Array.isArray(this.stack.items) ? [...this.stack.items] : []
      }
    },
    addItem() {
      const value = this.newItem.trim()
      if (!value) return
      if (!this.formData.items.includes(value)) {
        this.formData.items.push(value)
      }
      this.newItem = ''
    },
    removeItem(index) {
      this.formData.items.splice(index, 1)
    },
    handleClose() {
      this.$emit('close')
    },
    async handleSubmit() {
      if (!this.formData.category || !this.formData.description || this.formData.items.length === 0) {
        this.errorMessage = 'Vui lòng điền đầy đủ Tên nhóm, Mô tả và ít nhất 1 item.'
        return
      }

      this.submitting = true
      this.errorMessage = ''

      try {
        const payload = {
          category: this.formData.category,
          description: this.formData.description,
          items: this.formData.items
        }

        let res
        if (this.isEditMode) {
          res = await adminService.updateTechStack(this.stack.id, payload)
        } else {
          res = await adminService.createTechStack(payload)
        }

        const msg = res?.message || (this.isEditMode ? 'Cập nhật tech stack thành công' : 'Tạo tech stack thành công')
        this.$emit('success', {
          message: msg,
          type: 'success',
          data: res?.data || null
        })
      } catch (error) {
        console.error('Error saving tech stack:', error)
        this.errorMessage = error.response?.data?.message || error.message || 'Có lỗi xảy ra khi lưu tech stack.'
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

<style scoped>
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

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

