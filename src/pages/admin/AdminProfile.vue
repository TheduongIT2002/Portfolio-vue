<template>
  <div class="max-w-5xl mx-auto space-y-10">
    <!-- Page Title -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div>
        <h2 class="text-3xl font-extrabold tracking-tight">Thông tin cá nhân</h2>
        <p class="text-slate-400 mt-1 text-sm font-medium">
          Quản lý thông tin hiển thị ngoài trang portfolio (avatar, slogan, liên hệ, social links).
        </p>
      </div>
    </div>

    <!-- Main Card -->
    <div class="bg-surface-dark rounded-2xl border border-border-dark shadow-2xl overflow-hidden">
      <!-- Loading / Error -->
      <div v-if="loading" class="px-6 py-10 text-center text-slate-400 text-sm font-medium">
        Đang tải thông tin cá nhân từ API...
      </div>
      <div v-else-if="errorMessage" class="px-6 py-10 text-center text-red-400 text-sm font-medium">
        {{ errorMessage }}
      </div>

      <form v-else @submit.prevent="handleSubmit">
        <div class="px-6 py-6 space-y-6">
          <!-- Avatar + CV -->
          <div class="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-6 items-start">
            <div class="flex flex-col items-center gap-3">
              <div class="w-28 h-28 rounded-2xl overflow-hidden border border-border-dark bg-slate-800/60">
                <img
                  v-if="avatarPreview || form.avatar_url"
                  :src="avatarPreview || form.avatar_url"
                  alt="Avatar preview"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center text-slate-500 text-xs"
                >
                  Chưa có avatar
                </div>
              </div>
              <div class="w-full flex flex-col items-center gap-2">
                <input
                  ref="avatarInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleAvatarSelect"
                />
                <button
                  type="button"
                  @click="$refs.avatarInput && $refs.avatarInput.click()"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/60 border border-border-dark rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-700/60 hover:border-primary transition-all"
                >
                  <span class="material-symbols-outlined text-[16px]">photo_camera</span>
                  Chọn avatar mới
                </button>

                <div v-if="avatarFile" class="text-[11px] text-slate-400 max-w-[220px] truncate text-center">
                  {{ avatarFile.name }}
                </div>

                <p class="text-[11px] text-slate-500 text-center max-w-[220px]">
                  Hỗ trợ JPG/PNG/WebP/GIF, tối đa ~2MB. Avatar mới sẽ hiển thị ngoài trang chính sau khi lưu.
                </p>
              </div>
            </div>

            <div class="space-y-4">
              <div class="space-y-2">
                <label class="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                  CV
                </label>
                <!-- Current CV -->
                <div class="flex items-center gap-3">
                  <input
                    v-model="form.cv_url"
                    type="url"
                    placeholder="Chưa có CV"
                    class="flex-1 px-4 py-2.5 bg-slate-800/50 border border-border-dark rounded-xl text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    readonly
                  />
                  <a
                    v-if="form.cv_url"
                    :href="form.cv_url"
                    target="_blank"
                    class="px-3 py-2 bg-primary/20 text-primary rounded-xl text-xs font-bold hover:bg-primary/30 transition-all flex items-center gap-1.5"
                  >
                    <span class="material-symbols-outlined text-[16px]">download</span>
                    Tải CV
                  </a>
                </div>

                <!-- Upload new CV -->
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 mt-2">
                  <div class="relative">
                    <input
                      ref="cvInput"
                      type="file"
                      accept=".pdf"
                      class="hidden"
                      @change="handleCvSelect"
                    />
                    <button
                      type="button"
                      @click="$refs.cvInput && $refs.cvInput.click()"
                      class="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/60 border border-border-dark rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-700/60 hover:border-primary transition-all"
                    >
                      <span class="material-symbols-outlined text-[16px]">upload_file</span>
                      Chọn CV mới (PDF)
                    </button>
                  </div>
                  <div v-if="cvFile" class="flex-1 text-[11px] text-slate-400 truncate">
                    File đã chọn: <span class="text-slate-200 font-medium">{{ cvFile.name }}</span>
                  </div>
                </div>
                <p class="text-[11px] text-slate-500 mt-1.5">
                  Hỗ trợ định dạng PDF, kích thước tối đa ~5MB. Sau khi lưu, CV mới sẽ được dùng ngoài trang chính.
                </p>
              </div>
            </div>
          </div>

          <!-- Basic Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-slate-300 mb-2">
                Họ tên <span class="text-red-400">*</span>
              </label>
              <input
                v-model="form.full_name"
                type="text"
                required
                class="w-full px-4 py-3 bg-slate-800/50 border border-border-dark rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Ví dụ: Phan Thế Dương"
              />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-300 mb-2">
                Slogan / Role <span class="text-red-400">*</span>
              </label>
              <input
                v-model="form.slogan"
                type="text"
                required
                class="w-full px-4 py-3 bg-slate-800/50 border border-border-dark rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Ví dụ: Backend Developer, Fullstack Developer..."
              />
            </div>
          </div>

          <!-- Short Intro -->
          <div>
            <label class="block text-sm font-bold text-slate-300 mb-2">
              Giới thiệu ngắn <span class="text-red-400">*</span>
            </label>
            <textarea
              v-model="form.short_intro"
              rows="3"
              required
              class="w-full px-4 py-3 bg-slate-800/50 border border-border-dark rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              placeholder="Đoạn mô tả ngắn sẽ hiển thị ở Hero / About..."
            ></textarea>
          </div>

          <!-- Contact Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-slate-300 mb-2">
                Email <span class="text-red-400">*</span>
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 bg-slate-800/50 border border-border-dark rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-300 mb-2">
                Số điện thoại
              </label>
              <input
                v-model="form.phone"
                type="text"
                class="w-full px-4 py-3 bg-slate-800/50 border border-border-dark rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="+84 ..."
              />
            </div>
          </div>

          <!-- Address -->
          <div>
            <label class="block text-sm font-bold text-slate-300 mb-2">
              Địa chỉ
            </label>
            <input
              v-model="form.address"
              type="text"
              class="w-full px-4 py-3 bg-slate-800/50 border border-border-dark rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Thành phố, Quốc gia"
            />
          </div>

          <!-- Social Links -->
          <div>
            <label class="block text-sm font-bold text-slate-300 mb-2">
              Social Links
            </label>
            <div class="space-y-3">
              <div
                v-for="(link, index) in form.social_links"
                :key="index"
                class="flex flex-col md:flex-row gap-2 md:items-center bg-slate-800/40 border border-border-dark rounded-xl px-3 py-3"
              >
                <input
                  v-model="link.type"
                  type="text"
                  class="md:w-28 px-3 py-2 bg-slate-900/60 border border-border-dark rounded-lg text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="type (github, linkedin...)"
                />
                <input
                  v-model="link.label"
                  type="text"
                  class="md:w-40 px-3 py-2 bg-slate-900/60 border border-border-dark rounded-lg text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all flex-1"
                  placeholder="Label hiển thị"
                />
                <input
                  v-model="link.url"
                  type="url"
                  class="flex-1 px-3 py-2 bg-slate-900/60 border border-border-dark rounded-lg text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="https://..."
                />
                <button
                  type="button"
                  @click="removeSocialLink(index)"
                  class="px-2 py-1 text-slate-500 hover:text-red-400 transition-colors self-start md:self-auto"
                >
                  <span class="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>

              <button
                type="button"
                @click="addSocialLink"
                class="inline-flex items-center gap-1.5 px-3 py-2 bg-primary/10 text-primary rounded-lg text-xs font-bold hover:bg-primary/20 transition-all"
              >
                <span class="material-symbols-outlined text-[18px]">add</span>
                Thêm social link
              </button>
            </div>
          </div>

          <!-- Error -->
          <div v-if="errorMessage" class="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p class="text-sm text-red-400 font-medium">{{ errorMessage }}</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-5 border-t border-border-dark bg-slate-800/20 flex items-center justify-end gap-3">
          <button
            type="submit"
            :disabled="submitting"
            class="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-glow hover:bg-blue-500 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center gap-2"
          >
            <span v-if="submitting" class="material-symbols-outlined text-[18px] animate-spin">sync</span>
            <span>{{ submitting ? 'Đang lưu...' : 'Lưu thay đổi' }}</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Toast -->
    <transition name="fade">
      <div
        v-if="toast.visible"
        class="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm font-medium"
        :class="toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'"
      >
        <span class="material-symbols-outlined text-[20px]">
          {{ toast.type === 'success' ? 'check_circle' : 'error' }}
        </span>
        <span>{{ toast.message }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { adminService } from '../../services/admin/adminService'

export default {
  name: 'AdminProfile',
  setup() {
    const form = ref({
      id: null,
      full_name: '',
      slogan: '',
      short_intro: '',
      avatar: '',
      avatar_url: '',
      cv_file: '',
      cv_url: '',
      email: '',
      phone: '',
      address: '',
      social_links: []
    })

    const cvFile = ref(null)
    const avatarFile = ref(null)
    const avatarPreview = ref('')
    const loading = ref(false)
    const submitting = ref(false)
    const errorMessage = ref('')
    const toast = ref({
      visible: false,
      message: '',
      type: 'success'
    })

    const loadPersonalInfo = async () => {
      try {
        loading.value = true
        errorMessage.value = ''
        const res = await adminService.getPersonalInfo()
        const data = res?.data || {}
        form.value = {
          id: data.id || null,
          full_name: data.full_name || '',
          slogan: data.slogan || '',
          short_intro: data.short_intro || '',
          avatar: data.avatar || '',
          avatar_url: data.avatar_url || '',
          cv_file: data.cv_file || '',
          cv_url: data.cv_url || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          social_links: Array.isArray(data.social_links) ? [...data.social_links] : []
        }
        avatarFile.value = null
        avatarPreview.value = ''
      } catch (error) {
        console.error('Failed to load personal info:', error)
        errorMessage.value = 'Không thể tải thông tin cá nhân từ API.'
      } finally {
        loading.value = false
      }
    }

    const showToast = (message, type = 'success') => {
      toast.value.message = message
      toast.value.type = type
      toast.value.visible = true
      if (window._profileToastTimeout) {
        clearTimeout(window._profileToastTimeout)
      }
      window._profileToastTimeout = setTimeout(() => {
        toast.value.visible = false
      }, 3000)
    }

    onMounted(() => {
      loadPersonalInfo()
    })

    return {
      form,
      cvFile,
      avatarFile,
      avatarPreview,
      loading,
      submitting,
      errorMessage,
      toast,
      loadPersonalInfo,
      showToast
    }
  },
  methods: {
    addSocialLink() {
      this.form.social_links.push({
        type: '',
        label: '',
        url: ''
      })
    },
    removeSocialLink(index) {
      this.form.social_links.splice(index, 1)
    },
    handleCvSelect(event) {
      const file = event.target.files[0]
      if (!file) return
      if (file.type !== 'application/pdf') {
        this.errorMessage = 'CV chỉ hỗ trợ định dạng PDF.'
        return
      }
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        this.errorMessage = 'Kích thước CV không được vượt quá 5MB.'
        return
      }
      this.errorMessage = ''
      this.cvFile = file
    },
    handleAvatarSelect(event) {
      const file = event.target.files[0]
      if (!file) return

      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Avatar phải là file hình ảnh hợp lệ.'
        return
      }

      const maxSize = 2 * 1024 * 1024 // 2MB
      if (file.size > maxSize) {
        this.errorMessage = 'Kích thước avatar không được vượt quá 2MB.'
        return
      }

      this.errorMessage = ''
      this.avatarFile = file

      const reader = new FileReader()
      reader.onload = (e) => {
        this.avatarPreview = e.target.result
      }
      reader.readAsDataURL(file)
    },
    async handleSubmit() {
      if (!this.form.full_name || !this.form.slogan || !this.form.short_intro || !this.form.email) {
        this.errorMessage = 'Vui lòng điền đầy đủ Họ tên, Slogan, Giới thiệu ngắn và Email.'
        return
      }

      this.submitting = true
      this.errorMessage = ''

      try {
        let payload

        if (this.cvFile || this.avatarFile) {
          // Dùng FormData khi upload CV hoặc avatar
          payload = new FormData()
          payload.append('full_name', this.form.full_name)
          payload.append('slogan', this.form.slogan)
          payload.append('short_intro', this.form.short_intro)
          payload.append('email', this.form.email)
          if (this.form.phone) payload.append('phone', this.form.phone)
          if (this.form.address) payload.append('address', this.form.address)
          ;(this.form.social_links || []).forEach((link, index) => {
            if (!link) return
            if (link.type) payload.append(`social_links[${index}][type]`, link.type)
            if (link.label) payload.append(`social_links[${index}][label]`, link.label)
            if (link.url) payload.append(`social_links[${index}][url]`, link.url)
          })
          if (this.cvFile) payload.append('cv_file', this.cvFile)
          // Key phổ biến cho upload avatar bên Laravel
          if (this.avatarFile) payload.append('avatar', this.avatarFile)
        } else {
          // Dùng JSON khi không upload CV mới
          payload = {
            full_name: this.form.full_name,
            slogan: this.form.slogan,
            short_intro: this.form.short_intro,
            email: this.form.email,
            phone: this.form.phone,
            address: this.form.address,
            social_links: this.form.social_links
          }
        }

        const res = await adminService.updatePersonalInfo(payload)
        const msg = res?.message || 'Cập nhật thông tin cá nhân thành công'
        this.showToast(msg, 'success')
        // Nếu backend trả về cv_url mới, cập nhật lại
        if (res?.data?.cv_url) {
          this.form.cv_url = res.data.cv_url
        }
        // Nếu backend trả về avatar_url mới, cập nhật lại
        if (res?.data?.avatar_url) {
          this.form.avatar_url = res.data.avatar_url
        }
        // Reset file input
        this.cvFile = null
        this.avatarFile = null
        this.avatarPreview = ''
        if (this.$refs.cvInput) {
          this.$refs.cvInput.value = ''
        }
        if (this.$refs.avatarInput) {
          this.$refs.avatarInput.value = ''
        }
      } catch (error) {
        console.error('Error updating personal info:', error)
        this.errorMessage =
          error.response?.data?.message || error.message || 'Có lỗi xảy ra khi cập nhật thông tin cá nhân.'
        this.showToast(this.errorMessage, 'error')
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>

