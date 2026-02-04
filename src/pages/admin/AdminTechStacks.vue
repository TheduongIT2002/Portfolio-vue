<template>
  <div class="max-w-7xl mx-auto space-y-10">
    <!-- Page Title -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div>
        <h2 class="text-3xl font-extrabold tracking-tight">Tech Stack & Tools</h2>
        <p class="text-slate-400 mt-1 text-sm font-medium">
          Quản lý các nhóm công nghệ và công cụ đang sử dụng trong portfolio.
        </p>
      </div>
      <button
        @click="handleCreate"
        class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-glow hover:bg-blue-500 active:scale-95 transition-all"
      >
        <span class="material-symbols-outlined text-[22px]">add</span>
        Thêm nhóm Tech Stack
      </button>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        label="Số nhóm"
        :value="stats.totalCategories"
        icon="category"
        color-class="text-primary"
        bg-class="bg-primary/10"
      />
      <StatCard 
        label="Tổng công nghệ / tools"
        :value="stats.totalItems"
        icon="build"
        color-class="text-emerald-400"
        bg-class="bg-emerald-500/10"
      />
      <StatCard 
        label="Nhóm backend / database"
        :value="stats.backendCategories"
        icon="dns"
        color-class="text-amber-400"
        bg-class="bg-amber-500/10"
      />
    </div>

    <!-- Table Container -->
    <div class="bg-surface-dark rounded-2xl border border-border-dark overflow-hidden shadow-2xl">
      <!-- Header -->
      <div class="px-6 py-5 border-b border-border-dark flex flex-wrap gap-4 items-center justify-between bg-slate-800/20">
        <p class="text-xs text-slate-500 font-medium">
          Dữ liệu được đồng bộ với phần Tech Stack ngoài trang chính.
        </p>
      </div>

      <!-- Body -->
      <div class="overflow-x-auto">
        <!-- Loading / Error -->
        <div v-if="loading" class="px-6 py-10 text-center text-slate-400 text-sm font-medium">
          Đang tải danh sách tech stack...
        </div>
        <div v-else-if="errorMessage" class="px-6 py-10 text-center text-red-400 text-sm font-medium">
          {{ errorMessage }}
        </div>

        <table v-else class="w-full text-left">
          <thead>
            <tr class="border-b border-border-dark text-[10px] uppercase tracking-widest text-slate-500 font-bold bg-slate-800/30">
              <th class="px-6 py-4 w-56">Nhóm</th>
              <th class="px-6 py-4">Mô tả</th>
              <th class="px-6 py-4 w-60">Danh sách items</th>
              <th class="px-6 py-4 text-right w-32">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border-dark/50">
            <tr
              v-for="stack in techStacks"
              :key="stack.id || stack.category"
              class="group hover:bg-slate-800/40 transition-colors"
            >
              <!-- Category -->
              <td class="px-6 py-5 align-top">
                <p class="text-sm font-bold text-white group-hover:text-primary transition-colors">
                  {{ stack.category }}
                </p>
              </td>

              <!-- Description -->
              <td class="px-6 py-5 align-top">
                <p class="text-xs text-slate-400 leading-relaxed">
                  {{ stack.description }}
                </p>
              </td>

              <!-- Items -->
              <td class="px-6 py-5 align-top">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="item in stack.items || []"
                    :key="item"
                    class="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-800 text-[11px] text-slate-200 border border-slate-700"
                  >
                    {{ item }}
                  </span>
                </div>
              </td>

              <!-- Actions -->
              <td class="px-6 py-5 text-right align-top">
                <div class="flex items-center justify-end gap-1">
                  <button
                    @click="handleEdit(stack)"
                    class="p-2 text-slate-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                    title="Chỉnh sửa"
                  >
                    <span class="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button
                    @click="handleDelete(stack)"
                    class="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                    title="Xóa"
                  >
                    <span class="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="!loading && techStacks.length === 0">
              <td colspan="4" class="px-6 py-16 text-center text-slate-500 text-sm font-medium italic">
                Chưa có nhóm Tech Stack nào. Hãy thêm mới một nhóm.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Tech Stack Modal -->
    <TechStackModal
      :is-open="isModalOpen"
      :stack="selectedStack"
      @close="handleModalClose"
      @success="handleModalSuccess"
    />

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
import { ref, computed, onMounted } from 'vue'
import StatCard from '../../components/admin/StatCard.vue'
import TechStackModal from '../../components/admin/modals/TechStackModal.vue'
import { adminService } from '../../services/admin/adminService'

export default {
  name: 'AdminTechStacks',
  components: {
    StatCard,
    TechStackModal
  },
  setup() {
    const techStacks = ref([])
    const loading = ref(false)
    const errorMessage = ref('')

    const toast = ref({
      visible: false,
      message: '',
      type: 'success'
    })

    const isModalOpen = ref(false)
    const selectedStack = ref(null)

    const loadTechStacks = async () => {
      try {
        loading.value = true
        errorMessage.value = ''

        const res = await adminService.getTechStacks()
        // Hỗ trợ cả 2 format: { data: [...] } hoặc { data: { data: [...] } }
        const raw = res?.data
        let items = []
        if (Array.isArray(raw)) {
          items = raw
        } else if (Array.isArray(raw?.data)) {
          items = raw.data
        } else {
          items = []
        }

        techStacks.value = items
      } catch (error) {
        console.error('Failed to load tech stacks from API:', error)
        errorMessage.value = 'Không thể tải danh sách tech stack từ API.'
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadTechStacks()
    })

    const stats = computed(() => {
      const totalCategories = techStacks.value.length
      const totalItems = techStacks.value.reduce((sum, s) => sum + (s.items?.length || 0), 0)
      const backendCategories = techStacks.value.filter(s =>
        (s.category || '').toLowerCase().includes('backend') ||
        (s.category || '').toLowerCase().includes('database')
      ).length
      return { totalCategories, totalItems, backendCategories }
    })

    const showToast = (message, type = 'success') => {
      toast.value.message = message
      toast.value.type = type
      toast.value.visible = true

      if (window._techToastTimeout) {
        clearTimeout(window._techToastTimeout)
      }
      window._techToastTimeout = setTimeout(() => {
        toast.value.visible = false
      }, 3000)
    }

    return {
      techStacks,
      loading,
      errorMessage,
      stats,
      isModalOpen,
      selectedStack,
      loadTechStacks,
      toast,
      showToast
    }
  },
  methods: {
    handleCreate() {
      this.selectedStack = null
      this.isModalOpen = true
    },
    handleEdit(stack) {
      this.selectedStack = { ...stack }
      this.isModalOpen = true
    },
    handleModalClose() {
      this.isModalOpen = false
      this.selectedStack = null
    },
    async handleModalSuccess(payload) {
      await this.loadTechStacks()
      if (payload && payload.message) {
        this.showToast(payload.message, payload.type || 'success')
      }
      this.handleModalClose()
    },
    async handleDelete(stack) {
      if (!confirm(`Bạn có chắc muốn xóa nhóm \"${stack.category}\"?`)) return
      try {
        const res = await adminService.deleteTechStack(stack.id)
        const msg = res?.message || 'Xóa tech stack thành công'
        this.showToast(msg, 'success')
        await this.loadTechStacks()
      } catch (error) {
        console.error('Error deleting tech stack:', error)
        const errorMessage = error.response?.data?.message || error.message || 'Có lỗi xảy ra khi xóa tech stack'
        this.showToast(errorMessage, 'error')
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

