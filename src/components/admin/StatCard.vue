<template>
  <div class="bg-surface-dark border border-border-dark rounded-xl p-5 flex items-center justify-between transition-transform hover:scale-[1.02]">
    <div>
      <p class="text-xs font-medium text-slate-400 uppercase tracking-wider">{{ label }}</p>
      <p :class="`text-3xl font-bold mt-1 ${colorClass}`">{{ value }}</p>
    </div>
    <div :class="`p-3 ${bgClass} rounded-xl ${colorClass}`">
      <span class="material-symbols-outlined text-2xl">{{ icon }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    colorClass: {
      type: String,
      default: 'text-primary'
    },
    bgClass: {
      type: String,
      default: 'bg-primary/10'
    }
  }
}
</script>
