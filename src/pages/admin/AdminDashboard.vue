<template>
  <div class="max-w-7xl mx-auto space-y-10">
    <!-- Page Title -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div>
        <h2 class="text-3xl font-extrabold tracking-tight">Projects</h2>
        <p class="text-slate-400 mt-1 text-sm font-medium">Manage and monitor your portfolio achievements.</p>
      </div>
      <button 
        @click="handleCreateProject"
        class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-glow hover:bg-blue-500 active:scale-95 transition-all"
      >
        <span class="material-symbols-outlined text-[22px]">add</span>
        Create New Project
      </button>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        label="Total Projects" 
        :value="stats.total" 
        icon="folder" 
        color-class="text-primary" 
        bg-class="bg-primary/10" 
      />
      <StatCard 
        label="Published" 
        :value="stats.published" 
        icon="public" 
        color-class="text-green-500" 
        bg-class="bg-green-500/10" 
      />
      <StatCard 
        label="Drafts" 
        :value="stats.drafts" 
        icon="edit_note" 
        color-class="text-amber-500" 
        bg-class="bg-amber-500/10" 
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
            :key="filter"
            @click="statusFilter = filter"
            :class="`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
              statusFilter === filter ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`"
          >
            {{ filter }}
          </button>
        </div>
        
        <!-- Sort -->
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-500 font-medium">Sort by:</span>
          <select 
            v-model="sortBy"
            class="bg-transparent border-none text-xs font-bold text-slate-300 focus:ring-0 cursor-pointer pr-8"
          >
            <option value="date-newest" class="bg-surface-dark">Date Created (Newest)</option>
            <option value="date-oldest" class="bg-surface-dark">Date Created (Oldest)</option>
            <option value="name-asc" class="bg-surface-dark">Name (A-Z)</option>
            <option value="name-desc" class="bg-surface-dark">Name (Z-A)</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <!-- Loading / Error states -->
        <div v-if="loading" class="px-6 py-10 text-center text-slate-400 text-sm font-medium">
          Đang tải danh sách projects từ API...
        </div>
        <div v-else-if="errorMessage" class="px-6 py-10 text-center text-red-400 text-sm font-medium">
          {{ errorMessage }}
        </div>

        <table v-else class="w-full text-left">
          <thead>
            <tr class="border-b border-border-dark text-[10px] uppercase tracking-widest text-slate-500 font-bold bg-slate-800/30">
              <th class="px-6 py-4 w-28 text-center">Thumbnail</th>
              <th class="px-6 py-4">Project Name & Info</th>
              <th class="px-6 py-4">Technologies</th>
              <th class="px-6 py-4 text-right w-32">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border-dark/50">
            <tr 
              v-for="project in filteredProjects" 
              :key="project.id"
              class="group hover:bg-slate-800/40 transition-colors"
            >
              <!-- Thumbnail -->
              <td class="px-6 py-5">
                <div 
                  class="h-14 w-20 bg-cover bg-center rounded-lg border border-border-dark shadow-sm group-hover:scale-105 transition-transform" 
                  :style="{ backgroundImage: `url('${project.thumbnail}')` }"
                />
              </td>
              
              <!-- Project Info -->
              <td class="px-6 py-5">
                <div>
                  <p class="text-sm font-bold text-white group-hover:text-primary transition-colors">{{ project.name }}</p>
                  <p class="text-xs text-slate-500 mt-1 line-clamp-1 font-medium">{{ project.description }}</p>
                </div>
              </td>
              
              <!-- Technologies -->
              <td class="px-6 py-5">
                <div class="flex flex-wrap gap-2">
                  <TechBadge 
                    v-for="tech in project.techStack" 
                    :key="tech" 
                    :tech="tech" 
                  />
                </div>
              </td>
              
              <!-- Actions -->
              <td class="px-6 py-5 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button 
                    @click="handleEdit(project)"
                    class="p-2 text-slate-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" 
                    title="Edit"
                  >
                    <span class="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button 
                    @click="handleDelete(project)"
                    class="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" 
                    title="Delete"
                  >
                    <span class="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </td>
            </tr>
            
            <!-- Empty State -->
            <tr v-if="filteredProjects.length === 0">
              <td colspan="4" class="px-6 py-20 text-center text-slate-500 font-medium italic">
                No projects found matching your criteria.
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
            @click="loadProjects(pagination.current_page - 1)"
          >
            Previous
          </button>
          <button 
            class="px-4 py-2 border border-border-dark rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            :disabled="loading || pagination.current_page >= pagination.last_page"
            @click="loadProjects(pagination.current_page + 1)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import StatCard from '../../components/admin/StatCard.vue'
import TechBadge from '../../components/admin/TechBadge.vue'
import { ProjectStatus } from '../../types/admin'
import { adminService } from '../../services/admin/adminService'

export default {
  name: 'AdminDashboard',
  components: {
    StatCard,
    TechBadge
  },
  props: {
    searchQuery: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const projects = ref([])
    const loading = ref(false)
    const errorMessage = ref('')

    const statusFilter = ref('All')
    const sortBy = ref('date-newest')
    const statusFilters = ['All', 'Published', 'Draft']

    const pagination = ref({
      current_page: 1,
      last_page: 1,
      from: 0,
      to: 0,
      total: 0
    })

    const mapApiProject = (item) => {
      return {
        id: item.id,
        name: item.title,
        description: item.description || '',
        thumbnail: item.image || 'https://via.placeholder.com/300x180?text=Project',
        techStack: item.technologies || [],
        status: item.is_active ? ProjectStatus.PUBLISHED : ProjectStatus.DRAFT,
        createdAt: item.created_at || new Date().toISOString()
      }
    }

    const loadProjects = async (page = 1) => {
      try {
        loading.value = true
        errorMessage.value = ''
        const res = await adminService.getCmsProjects(page)
        const payload = res?.data || {}
        const items = payload.data || []

        projects.value = items.map(mapApiProject)
        pagination.value = {
          current_page: payload.current_page || 1,
          last_page: payload.last_page || 1,
          from: payload.from || 0,
          to: payload.to || 0,
          total: payload.total || items.length
        }
      } catch (error) {
        console.error('Failed to load projects from API:', error)
        errorMessage.value = 'Không thể tải danh sách projects từ API.'
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadProjects(1)
    })

    // Tính toán stats
    const stats = computed(() => {
      return {
        total: projects.value.length,
        published: projects.value.filter(p => p.status === ProjectStatus.PUBLISHED).length,
        drafts: projects.value.filter(p => p.status === ProjectStatus.DRAFT).length
      }
    })

    // Lọc và sắp xếp projects
    const filteredProjects = computed(() => {
      let filtered = projects.value.filter(p => {
        // Lọc theo search query từ props
        const searchQuery = props.searchQuery || ''
        const matchesSearch = !searchQuery || 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
        
        // Lọc theo status
        const matchesStatus = statusFilter.value === 'All' || p.status === statusFilter.value
        
        return matchesSearch && matchesStatus
      })

      // Sắp xếp
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy.value) {
          case 'date-newest':
            return new Date(b.createdAt) - new Date(a.createdAt)
          case 'date-oldest':
            return new Date(a.createdAt) - new Date(b.createdAt)
          case 'name-asc':
            return a.name.localeCompare(b.name)
          case 'name-desc':
            return b.name.localeCompare(a.name)
          default:
            return 0
        }
      })

      return filtered
    })

      return {
        projects,
        statusFilter,
        sortBy,
        statusFilters,
        stats,
        filteredProjects,
        pagination,
        loading,
        errorMessage,
        loadProjects
      }
  },
  methods: {
    handleCreateProject() {
      // TODO: Mở modal tạo project mới
      console.log('Create new project')
    },
    handleEdit(project) {
      // TODO: Mở modal edit project
      console.log('Edit project:', project)
    },
    handleDelete(project) {
      // TODO: Xác nhận và xóa project
      if (confirm(`Bạn có chắc muốn xóa "${project.name}"?`)) {
        console.log('Delete project:', project)
      }
    }
  }
}
</script>
