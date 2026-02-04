<template>
  <div class="max-w-7xl mx-auto space-y-10">
    <!-- Page Title -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div>
        <h2 class="text-3xl font-extrabold tracking-tight">Quản lý Liên hệ</h2>
        <p class="text-slate-400 mt-1 text-sm font-medium">Xem và quản lý các thông tin liên hệ từ khách hàng.</p>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        label="Tổng liên hệ" 
        :value="stats.total" 
        icon="mail" 
        color-class="text-primary" 
        bg-class="bg-primary/10" 
      />
      <StatCard 
        label="Chưa đọc" 
        :value="stats.unread" 
        icon="mark_email_unread" 
        color-class="text-amber-500" 
        bg-class="bg-amber-500/10" 
      />
      <StatCard 
        label="Đã đọc" 
        :value="stats.read" 
        icon="mark_email_read" 
        color-class="text-green-500" 
        bg-class="bg-green-500/10" 
      />
    </div>

    <!-- Table Container -->
    <div class="bg-surface-dark rounded-2xl border border-border-dark overflow-hidden shadow-2xl">
      <!-- Filter & Sort Bar -->
      <div class="px-6 py-5 border-b border-border-dark flex flex-wrap gap-6 items-center justify-between bg-slate-800/20">
        <!-- Status Filter -->
        <div class="flex bg-slate-800 rounded-lg p-1">
          <button 
            v-for="filter in statusFilters"
            :key="filter.value"
            @click="statusFilter = filter.value"
            :class="`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
              statusFilter === filter.value ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <!-- Loading / Error states -->
        <div v-if="loading" class="px-6 py-10 text-center text-slate-400 text-sm font-medium">
          Đang tải danh sách liên hệ...
        </div>
        <div v-else-if="errorMessage" class="px-6 py-10 text-center text-red-400 text-sm font-medium">
          {{ errorMessage }}
        </div>

        <table v-else class="w-full text-left">
          <thead>
            <tr class="border-b border-border-dark text-[10px] uppercase tracking-widest text-slate-500 font-bold bg-slate-800/30">
              <th class="px-6 py-4">Thông tin liên hệ</th>
              <th class="px-6 py-4">Chủ đề</th>
              <th class="px-6 py-4">Trạng thái</th>
              <th class="px-6 py-4">Ngày gửi</th>
              <th class="px-6 py-4 text-right w-32">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border-dark/50">
            <tr 
              v-for="contact in filteredContacts" 
              :key="contact.id"
              :class="`group hover:bg-slate-800/40 transition-colors ${
                contact.status === 'new' ? 'bg-slate-900/30' : ''
              }`"
            >
              <!-- Contact Info -->
              <td class="px-6 py-5">
                <div>
                  <div class="flex items-center gap-2">
                    <p class="text-sm font-bold text-white group-hover:text-primary transition-colors">
                      {{ contact.name }}
                    </p>
                    <span v-if="contact.status === 'new'" class="w-2 h-2 bg-primary rounded-full"></span>
                  </div>
                  <p class="text-xs text-slate-500 mt-1 font-medium">{{ contact.email }}</p>
                  <p v-if="contact.phone" class="text-xs text-slate-500 mt-0.5">{{ contact.phone }}</p>
                </div>
              </td>
              
              <!-- Subject -->
              <td class="px-6 py-5">
                <p class="text-sm text-slate-300 line-clamp-1 font-medium">{{ contact.subject }}</p>
              </td>
              
              <!-- Status -->
              <td class="px-6 py-5">
                <span 
                  :class="`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${
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
              </td>
              
              <!-- Date -->
              <td class="px-6 py-5">
                <p class="text-xs text-slate-400 font-medium">{{ formatDate(contact.created_at) }}</p>
              </td>
              
              <!-- Actions -->
              <td class="px-6 py-5 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button 
                    @click="handleView(contact)"
                    class="p-2 text-slate-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" 
                    title="Xem chi tiết"
                  >
                    <span class="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                  <button 
                    v-if="contact.status === 'new'"
                    @click="handleMarkAsRead(contact)"
                    class="p-2 text-slate-500 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all" 
                    title="Đánh dấu đã đọc"
                  >
                    <span class="material-symbols-outlined text-[20px]">done</span>
                  </button>
                  <button 
                    @click="handleDelete(contact)"
                    class="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" 
                    title="Xóa"
                  >
                    <span class="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </td>
            </tr>
            
            <!-- Empty State -->
            <tr v-if="filteredContacts.length === 0">
              <td colspan="5" class="px-6 py-20 text-center text-slate-500 font-medium italic">
                Không có liên hệ nào.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-5 border-t border-border-dark flex items-center justify-between bg-slate-800/10">
        <p class="text-xs text-slate-500 font-medium">
          Showing <span class="text-white font-bold">{{ pagination.from || 0 }}</span> to 
          <span class="text-white font-bold">{{ pagination.to || 0 }}</span> of 
          <span class="text-white font-bold">{{ pagination.total || 0 }}</span> results
        </p>
        <div class="flex gap-3">
          <button 
            class="px-4 py-2 border border-border-dark rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all" 
            :disabled="loading || pagination.current_page <= 1"
            @click="loadContacts(pagination.current_page - 1)"
          >
            Previous
          </button>
          <button 
            class="px-4 py-2 border border-border-dark rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            :disabled="loading || pagination.current_page >= pagination.last_page"
            @click="loadContacts(pagination.current_page + 1)"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Contact Detail Modal -->
    <ContactDetailModal
      :is-open="isModalOpen"
      :contact="selectedContact"
      @close="handleModalClose"
      @mark-read="handleMarkAsReadFromModal"
    />

    <!-- Toast Notification -->
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
import { computed, ref, onMounted } from 'vue'
import StatCard from '../../components/admin/StatCard.vue'
import ContactDetailModal from '../../components/admin/modals/ContactDetailModal.vue'
import { adminService } from '../../services/admin/adminService'

export default {
  name: 'AdminContacts',
  components: {
    StatCard,
    ContactDetailModal
  },
  setup() {
    const contacts = ref([])
    const loading = ref(false)
    const errorMessage = ref('')
    const statusFilter = ref('all')
    const statusFilters = [
      { value: 'all', label: 'Tất cả' },
      { value: 'new', label: 'Chưa đọc' },
      { value: 'read', label: 'Đã đọc' }
    ]

    const pagination = ref({
      current_page: 1,
      last_page: 1,
      from: 0,
      to: 0,
      total: 0
    })

    // Toast state
    const toast = ref({
      visible: false,
      message: '',
      type: 'success'
    })

    // Modal state
    const isModalOpen = ref(false)
    const selectedContact = ref(null)

    const loadContacts = async (page = 1) => {
      try {
        loading.value = true
        errorMessage.value = ''
        const res = await adminService.getContacts(page)
        const payload = res?.data || {}
        const items = payload.data || []

        contacts.value = items
        pagination.value = {
          current_page: payload.current_page || 1,
          last_page: payload.last_page || 1,
          from: payload.from || 0,
          to: payload.to || 0,
          total: payload.total || items.length
        }
      } catch (error) {
        console.error('Failed to load contacts from API:', error)
        errorMessage.value = 'Không thể tải danh sách liên hệ từ API.'
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadContacts(1)
    })

    // Tính toán stats
    const stats = computed(() => {
      return {
        total: contacts.value.length,
        unread: contacts.value.filter(c => c.status === 'new').length,
        read: contacts.value.filter(c => c.status === 'read').length
      }
    })

    // Lọc contacts
    const filteredContacts = computed(() => {
      if (statusFilter.value === 'all') {
        return contacts.value
      }
      return contacts.value.filter(c => c.status === statusFilter.value)
    })

    const formatDate = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const showToast = (message, type = 'success') => {
      toast.value.message = message
      toast.value.type = type
      toast.value.visible = true

      if (window._toastTimeout) {
        clearTimeout(window._toastTimeout)
      }
      window._toastTimeout = setTimeout(() => {
        toast.value.visible = false
      }, 3000)
    }

    return {
      contacts,
      loading,
      errorMessage,
      statusFilter,
      statusFilters,
      stats,
      filteredContacts,
      pagination,
      loadContacts,
      formatDate,
      isModalOpen,
      selectedContact,
      toast,
      showToast
    }
  },
  methods: {
    handleView(contact) {
      this.selectedContact = contact
      this.isModalOpen = true
    },
    handleModalClose() {
      this.isModalOpen = false
      this.selectedContact = null
    },
    async handleMarkAsRead(contact) {
      if (contact.status === 'read') return
      
      try {
        const res = await adminService.updateContactStatus(contact.id, 'read')
        if (res && res.message) {
          this.showToast(res.message, 'success')
          contact.status = 'read'
          // Reload để cập nhật stats
          await this.loadContacts(this.pagination.current_page)
        }
      } catch (error) {
        console.error('Error marking contact as read:', error)
        const errorMessage = error.response?.data?.message || error.message || 'Có lỗi xảy ra khi đánh dấu đã đọc'
        this.showToast(errorMessage, 'error')
      }
    },
    async handleMarkAsReadFromModal(contact) {
      await this.handleMarkAsRead(contact)
      this.handleModalClose()
    },
    async handleDelete(contact) {
      if (confirm(`Bạn có chắc muốn xóa liên hệ từ "${contact.name}"?`)) {
        try {
          const res = await adminService.deleteContact(contact.id)
          if (res && res.message) {
            this.showToast(res.message, 'success')
            await this.loadContacts(this.pagination.current_page)
          }
        } catch (error) {
          console.error('Error deleting contact:', error)
          const errorMessage = error.response?.data?.message || error.message || 'Có lỗi xảy ra khi xóa liên hệ'
          this.showToast(errorMessage, 'error')
        }
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
