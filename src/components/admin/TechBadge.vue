<template>
  <span :class="`px-2 py-1 rounded-md text-[10px] font-semibold border ${getColors(tech)}`">
    {{ tech }}
  </span>
</template>

<script>
export default {
  name: 'TechBadge',
  props: {
    tech: {
      type: String,
      required: true
    }
  },
  methods: {
    getColors(tech) {
      const techLower = tech.toLowerCase()
      if (techLower.includes('react')) return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      if (techLower.includes('node')) return 'bg-green-500/10 text-green-400 border-green-500/20'
      if (techLower.includes('python')) return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
      if (techLower.includes('html')) return 'bg-orange-500/10 text-orange-400 border-orange-500/20'
      if (techLower.includes('js')) return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      return 'bg-slate-800 text-slate-400 border-slate-700'
    }
  }
}
</script>
