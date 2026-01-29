<template>
  <header class="h-16 flex items-center justify-between px-6 bg-surface-dark border-b border-border-dark sticky top-0 z-20">
    <!-- Search Bar -->
    <div class="flex-1 max-w-md">
      <div class="relative group">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary">
          <span class="material-symbols-outlined text-[20px]">search</span>
        </span>
        <input 
          type="text" 
          placeholder="Search projects (Ctrl+K)..."
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
          class="block w-full pl-10 pr-3 py-2 border-none rounded-xl bg-slate-800 text-slate-300 placeholder-slate-500 focus:ring-1 focus:ring-primary text-sm transition-all"
        />
        <div class="absolute inset-y-0 right-3 flex items-center">
          <kbd class="hidden sm:inline-block border border-border-dark rounded px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-900">⌘K</kbd>
        </div>
      </div>
    </div>

    <!-- Right Side Actions -->
    <div class="flex items-center gap-5 ml-auto">
      <!-- Notifications -->
      <button class="relative p-2 text-slate-400 hover:text-white transition-colors">
        <span class="material-symbols-outlined text-[24px]">notifications</span>
        <span class="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-surface-dark"></span>
      </button>
      
      <div class="h-8 w-px bg-border-dark"></div>
      
      <!-- User Profile -->
      <button class="flex items-center gap-3 hover:bg-slate-800/50 p-1 pr-3 rounded-full transition-all group">
        <div 
          class="w-9 h-9 rounded-full bg-cover bg-center ring-2 ring-border-dark group-hover:ring-primary transition-all" 
          :style="{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBlDdyQ8Ba5esOSYsO8P6qxwsdVe0XXp7L_DSXgHzSX7-G4eb0j_O7ooBQ37L4yvcYc7IAv2bPUx5V6edp6lGSZe2SUAjdgs3ikCM8aXGSc_QPceUnwwpCruub_0dNE3GjF0pzlDbfcR4VdijN9TF2r0HMsg9jxJ-ZRfDtmJHR4df96ei2hGLHLgBGtqlgcTgldFclz3uLiCxUtKzd9teVEQBgHs7HWcy5OVzgr0JLFfvXx9QOMDIkPQLY-srT4yVqlOwf1hZwlGWtP')` }"
        />
        <div class="hidden sm:block text-left">
          <p class="text-xs font-bold leading-none">Dương P.</p>
          <p class="text-[10px] text-slate-500 mt-1">Admin</p>
        </div>
        <span class="material-symbols-outlined text-slate-500 text-lg hidden sm:block">expand_more</span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AdminHeader',
  props: {
    searchQuery: {
      type: String,
      default: ''
    }
  },
  emits: ['update:searchQuery']
}
</script>
