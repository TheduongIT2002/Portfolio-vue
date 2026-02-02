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
          class="bg-surface-dark rounded-2xl border border-border-dark shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          <!-- Header -->
          <div class="px-6 py-5 border-b border-border-dark bg-slate-800/30 flex items-center justify-between">
            <div>
              <h3 class="text-xl font-extrabold text-white">
                {{ isEditMode ? 'Chỉnh sửa Project' : 'Tạo Project Mới' }}
              </h3>
              <p class="text-xs text-slate-400 mt-1 font-medium">
                {{ isEditMode ? 'Cập nhật thông tin project của bạn' : 'Điền thông tin để tạo project mới' }}
              </p>
            </div>
            <button 
              @click="handleClose"
              class="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
            >
              <span class="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          <!-- Form Content (Scrollable) -->
          <form @submit.prevent="handleSubmit" class="flex-1 overflow-y-auto">
            <div class="px-6 py-6 space-y-6">
              <!-- Title -->
              <div>
                <label class="block text-sm font-bold text-slate-300 mb-2">
                  Tên Project <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="formData.title"
                  type="text"
                  required
                  placeholder="Ví dụ: Portfolio Website"
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
                  rows="4"
                  placeholder="Mô tả ngắn gọn về project..."
                  class="w-full px-4 py-3 bg-slate-800/50 border border-border-dark rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

              <!-- Image Upload -->
              <div>
                <label class="block text-sm font-bold text-slate-300 mb-2">
                  Hình ảnh Project
                </label>
                
                <!-- Preview Image -->
                <div v-if="imagePreview || (isEditMode && formData.image && !selectedFile)" class="mb-3">
                  <div class="relative inline-block">
                    <img
                      :src="imagePreview || formData.image"
                      alt="Project preview"
                      class="max-w-full max-h-64 rounded-xl border border-border-dark object-cover"
                      @error="handleImageError"
                    />
                    <button
                      v-if="isEditMode && formData.image && !selectedFile"
                      type="button"
                      @click="clearExistingImage"
                      class="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-all"
                      title="Xóa ảnh hiện tại"
                    >
                      <span class="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>

                <!-- File Input -->
                <div class="relative">
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    @change="handleFileSelect"
                    class="hidden"
                  />
                  <button
                    type="button"
                    @click="$refs.fileInput.click()"
                    class="w-full px-4 py-3 bg-slate-800/50 border border-border-dark rounded-xl text-white hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all flex items-center justify-center gap-2"
                  >
                    <span class="material-symbols-outlined text-[20px]">upload</span>
                    <span class="font-medium">{{ selectedFile ? 'Thay đổi ảnh' : 'Chọn ảnh từ máy tính' }}</span>
                  </button>
                </div>
                
                <!-- Selected File Info -->
                <div v-if="selectedFile" class="mt-2 p-3 bg-slate-800/30 border border-border-dark rounded-lg flex items-center justify-between">
                  <div class="flex items-center gap-2 flex-1 min-w-0">
                    <span class="material-symbols-outlined text-primary text-[20px]">image</span>
                    <span class="text-sm text-slate-300 truncate">{{ selectedFile.name }}</span>
                    <span class="text-xs text-slate-500">({{ formatFileSize(selectedFile.size) }})</span>
                  </div>
                  <button
                    type="button"
                    @click="clearSelectedFile"
                    class="p-1 text-slate-400 hover:text-red-400 transition-colors"
                    title="Xóa file đã chọn"
                  >
                    <span class="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
                
                <p class="text-xs text-slate-500 mt-1.5">Chọn file ảnh từ máy tính của bạn (JPG, PNG, GIF, WebP)</p>
              </div>

              <!-- Project URL -->
              <div>
                <label class="block text-sm font-bold text-slate-300 mb-2">
                  URL Project (Demo)
                </label>
                <input
                  v-model="formData.url"
                  type="url"
                  placeholder="https://example.com"
                  class="w-full px-4 py-3 bg-slate-800/50 border border-border-dark rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <!-- GitHub URL -->
              <div>
                <label class="block text-sm font-bold text-slate-300 mb-2">
                  GitHub URL
                </label>
                <input
                  v-model="formData.github_url"
                  type="url"
                  placeholder="https://github.com/username/repo"
                  class="w-full px-4 py-3 bg-slate-800/50 border border-border-dark rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <!-- Technologies -->
              <div>
                <label class="block text-sm font-bold text-slate-300 mb-2">
                  Technologies <span class="text-red-400">*</span>
                </label>
                <div class="flex flex-wrap gap-2 mb-3">
                  <span
                    v-for="(tech, index) in formData.technologies"
                    :key="index"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/20 text-primary rounded-lg text-xs font-bold"
                  >
                    {{ tech }}
                    <button
                      type="button"
                      @click="removeTechnology(index)"
                      class="hover:text-red-400 transition-colors"
                    >
                      <span class="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </span>
                </div>
                <div class="flex gap-2">
                  <input
                    v-model="newTech"
                    type="text"
                    placeholder="Nhập tên công nghệ (Ví dụ: Laravel, Vue)"
                    @keyup.enter.prevent="addTechnology"
                    class="flex-1 px-4 py-3 bg-slate-800/50 border border-border-dark rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    @click="addTechnology"
                    class="px-4 py-3 bg-primary/20 text-primary rounded-xl font-bold text-sm hover:bg-primary/30 transition-all"
                  >
                    <span class="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>
                <p class="text-xs text-slate-500 mt-1.5">Nhấn Enter hoặc nút Add để thêm</p>
              </div>

              <!-- Dates Row -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Start Date -->
                <div>
                  <label class="block text-sm font-bold text-slate-300 mb-2">
                    Ngày bắt đầu
                  </label>
                  <input
                    v-model="formData.start_date"
                    type="date"
                    class="w-full px-4 py-3 bg-slate-800/50 border border-border-dark rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <!-- End Date -->
                <div>
                  <label class="block text-sm font-bold text-slate-300 mb-2">
                    Ngày kết thúc
                  </label>
                  <input
                    v-model="formData.end_date"
                    type="date"
                    class="w-full px-4 py-3 bg-slate-800/50 border border-border-dark rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <!-- Sort Order -->
              <div>
                <label class="block text-sm font-bold text-slate-300 mb-2">
                  Thứ tự sắp xếp
                </label>
                <input
                  v-model.number="formData.sort_order"
                  type="number"
                  min="0"
                  placeholder="0"
                  class="w-full px-4 py-3 bg-slate-800/50 border border-border-dark rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <p class="text-xs text-slate-500 mt-1.5">Số càng nhỏ, hiển thị càng trước</p>
              </div>

              <!-- Checkboxes Row -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Featured -->
                <label class="flex items-center gap-3 cursor-pointer group">
                  <input
                    v-model="formData.is_featured"
                    type="checkbox"
                    class="w-5 h-5 rounded border-border-dark bg-slate-800/50 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
                  />
                  <div>
                    <span class="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
                      Featured Project
                    </span>
                    <p class="text-xs text-slate-500 mt-0.5">Hiển thị nổi bật trên trang chủ</p>
                  </div>
                </label>

                <!-- Active -->
                <label class="flex items-center gap-3 cursor-pointer group">
                  <input
                    v-model="formData.is_active"
                    type="checkbox"
                    class="w-5 h-5 rounded border-border-dark bg-slate-800/50 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
                  />
                  <div>
                    <span class="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
                      Active / Published
                    </span>
                    <p class="text-xs text-slate-500 mt-0.5">Project đang hoạt động</p>
                  </div>
                </label>
              </div>

              <!-- Error Message -->
              <div v-if="errorMessage" class="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p class="text-sm text-red-400 font-medium">{{ errorMessage }}</p>
              </div>
            </div>

            <!-- Footer Actions -->
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
                <span>{{ submitting ? 'Đang xử lý...' : (isEditMode ? 'Cập nhật' : 'Tạo mới') }}</span>
              </button>
            </div>
          </form>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'ProjectModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    project: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'success'],
  data() {
    return {
      formData: {
        title: '',
        description: '',
        image: '',
        url: '',
        github_url: '',
        technologies: [],
        start_date: '',
        end_date: '',
        is_featured: false,
        is_active: true,
        sort_order: 0
      },
      selectedFile: null,
      imagePreview: null,
      removeExistingImage: false,
      newTech: '',
      submitting: false,
      errorMessage: ''
    }
  },
  computed: {
    isEditMode() {
      return !!this.project
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.resetForm()
        if (this.project) {
          this.loadProjectData()
        }
      }
    }
  },
  methods: {
    resetForm() {
      this.formData = {
        title: '',
        description: '',
        image: '',
        url: '',
        github_url: '',
        technologies: [],
        start_date: '',
        end_date: '',
        is_featured: false,
        is_active: true,
        sort_order: 0
      }
      this.selectedFile = null
      this.imagePreview = null
      this.removeExistingImage = false
      this.newTech = ''
      this.errorMessage = ''
      this.submitting = false
      // Reset file input
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
      }
    },
    loadProjectData() {
      if (!this.project) return

      const resolvedImage = this.project.image_url || this.project.image || ''
      const normalizeDate = (value) => {
        if (!value) return ''
        const str = value.toString()
        // Cắt về dạng YYYY-MM-DD để phù hợp input type="date"
        return str.length >= 10 ? str.slice(0, 10) : str
      }
      
      this.formData = {
        title: this.project.title || this.project.name || '',
        description: this.project.description || '',
        image: resolvedImage,
        url: this.project.url || '',
        github_url: this.project.github_url || '',
        technologies: this.project.technologies || this.project.techStack || [],
        start_date: normalizeDate(this.project.start_date),
        end_date: normalizeDate(this.project.end_date),
        is_featured: this.project.is_featured || false,
        is_active: this.project.is_active !== undefined ? this.project.is_active : (this.project.status === 'Published'),
        sort_order: this.project.sort_order || 0
      }
      // Nếu có image URL, hiển thị preview
      if (resolvedImage) {
        this.imagePreview = resolvedImage
      }
      this.selectedFile = null
    },
    handleImageError(event) {
      // Ẩn ảnh lỗi
      event.target.style.display = 'none'
    },
    addTechnology() {
      const tech = this.newTech.trim()
      if (tech && !this.formData.technologies.includes(tech)) {
        this.formData.technologies.push(tech)
        this.newTech = ''
      }
    },
    removeTechnology(index) {
      this.formData.technologies.splice(index, 1)
    },
    handleFileSelect(event) {
      const file = event.target.files[0]
      if (!file) return

      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Vui lòng chọn file ảnh hợp lệ (JPG, PNG, GIF, WebP)'
        // Reset file input
        if (this.$refs.fileInput) {
          this.$refs.fileInput.value = ''
        }
        return
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        this.errorMessage = 'Kích thước file không được vượt quá 5MB'
        // Reset file input
        if (this.$refs.fileInput) {
          this.$refs.fileInput.value = ''
        }
        return
      }

      this.selectedFile = file
      this.removeExistingImage = false
      this.errorMessage = ''

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        this.imagePreview = e.target.result
      }
      reader.readAsDataURL(file)
    },
    clearSelectedFile() {
      this.selectedFile = null
      this.imagePreview = null
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
      }
      // Nếu đang edit mode và có ảnh cũ, giữ lại preview ảnh cũ
      if (this.isEditMode && this.formData.image && !this.removeExistingImage) {
        this.imagePreview = this.formData.image
      }
    },
    clearExistingImage() {
      this.removeExistingImage = true
      this.formData.image = ''
      this.imagePreview = null
      this.selectedFile = null
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
      }
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
    },
    handleClose() {
      this.$emit('close')
    },
    async handleSubmit() {
      if (!this.formData.title || !this.formData.description || this.formData.technologies.length === 0) {
        this.errorMessage = 'Vui lòng điền đầy đủ các trường bắt buộc (Tên, Mô tả, Technologies)'
        return
      }

      this.submitting = true
      this.errorMessage = ''

      try {
        const { adminService } = await import('../../../services/admin/adminService')
        
        // Kiểm tra xem có file upload hoặc cần xóa ảnh cũ không
        const hasFileUpload = this.selectedFile !== null
        const shouldRemoveImage = this.removeExistingImage

        let payload
        let response

        if (hasFileUpload || shouldRemoveImage) {
          // Sử dụng FormData khi có file upload hoặc cần xóa ảnh
          payload = new FormData()
          payload.append('title', this.formData.title)
          payload.append('description', this.formData.description)
        
          ;(this.formData.technologies || []).forEach((tech, index) => {
            payload.append(`technologies[${index}]`, tech)
          })
          payload.append('is_featured', this.formData.is_featured ? '1' : '0')
          payload.append('is_active', this.formData.is_active ? '1' : '0')
          payload.append('sort_order', this.formData.sort_order.toString())

          // Thêm file nếu có
          if (this.selectedFile) {
            payload.append('image', this.selectedFile)
          }

          // Đánh dấu xóa ảnh cũ nếu cần
          if (shouldRemoveImage) {
            payload.append('remove_image', '1')
          }

          // Thêm các field optional nếu có giá trị
          if (this.formData.url) payload.append('url', this.formData.url)
          if (this.formData.github_url) payload.append('github_url', this.formData.github_url)
          if (this.formData.start_date) payload.append('start_date', this.formData.start_date)
          if (this.formData.end_date) payload.append('end_date', this.formData.end_date)
        } else {
          // Sử dụng JSON khi không có file upload
          payload = {
            title: this.formData.title,
            description: this.formData.description,
            technologies: this.formData.technologies,
            is_featured: this.formData.is_featured,
            is_active: this.formData.is_active,
            sort_order: this.formData.sort_order
          }

          // Thêm các field optional nếu có giá trị
          if (!this.isEditMode && this.formData.image && !shouldRemoveImage) {
            payload.image = this.formData.image
          }
          if (this.formData.url) payload.url = this.formData.url
          if (this.formData.github_url) payload.github_url = this.formData.github_url
          if (this.formData.start_date) payload.start_date = this.formData.start_date
          if (this.formData.end_date) payload.end_date = this.formData.end_date
        }

        // Gọi API
        if (this.isEditMode) {
          response = await adminService.updateProject(this.project.id, payload)
        } else {
          response = await adminService.createProject(payload)
        }

        // Thông báo thành công (để parent hiển thị toast)
        const successMessage = response?.message || (this.isEditMode ? 'Cập nhật project thành công' : 'Tạo project thành công')

        // Thành công - emit event để parent reload data + hiển thị toast
        this.$emit('success', {
          message: successMessage,
          type: 'success',
          data: response?.data || null
        })
        this.handleClose()
      } catch (error) {
        console.error('Error saving project:', error)
        this.errorMessage = error.response?.data?.message || error.message || 'Có lỗi xảy ra khi lưu project. Vui lòng thử lại.'
      } finally {
        this.submitting = false
      }
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
form::-webkit-scrollbar {
  width: 8px;
}

form::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.5);
}

form::-webkit-scrollbar-thumb {
  background: rgba(56, 189, 248, 0.3);
  border-radius: 4px;
}

form::-webkit-scrollbar-thumb:hover {
  background: rgba(56, 189, 248, 0.5);
}
</style>
