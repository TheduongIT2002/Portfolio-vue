<template>
  <div class="admin-dashboard">
    <h1 class="title">Admin Dashboard</h1>
    <p class="desc">
      Đây là trang admin demo để bạn mở rộng sau này (users, projects CRUD, v.v).
    </p>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard'
}
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  padding: 24px;
  background: var(--bg-color);
  color: var(--text-color);
}

.title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.desc {
  color: var(--text-light);
}
</style>
