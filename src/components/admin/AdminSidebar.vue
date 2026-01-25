<template>
  <aside class="w-64 bg-surface-dark border-r border-border-dark flex flex-col hidden md:flex z-30">
    <!-- Logo Header -->
    <div class="h-16 flex items-center px-6 border-b border-border-dark">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-glow">
          <span class="material-symbols-outlined text-xl">terminal</span>
        </div>
        <div>
          <h1 class="text-sm font-bold leading-tight">DevPortfolio</h1>
          <p class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Admin Console</p>
        </div>
      </div>
    </div>
    
    <!-- Navigation -->
    <nav class="flex-1 py-6 px-3 flex flex-col gap-1 overflow-y-auto">
      <button
        v-for="item in navItems"
        :key="item.id"
        @click="$emit('nav-click', item.id)"
        :class="`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
          activeTab === item.id 
            ? 'bg-primary/10 text-primary border-r-4 border-primary' 
            : 'text-slate-400 hover:text-white hover:bg-slate-800'
        }`"
      >
        <span :class="`material-symbols-outlined text-[22px] transition-transform ${activeTab === item.id ? '' : 'group-hover:scale-110'}`">
          {{ item.icon }}
        </span>
        <span class="text-sm font-medium">{{ item.label }}</span>
      </button>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-border-dark">
      <button 
        @click="$emit('sign-out')"
        class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
      >
        <span class="material-symbols-outlined text-[20px]">logout</span>
        <span class="text-sm font-medium">Sign Out</span>
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'AdminSidebar',
  props: {
    navItems: {
      type: Array,
      required: true
    },
    activeTab: {
      type: String,
      default: 'projects'
    }
  },
  emits: ['nav-click', 'sign-out']
}
</script>
