<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="header">
    <div class="header-content">
      <RouterLink to="/" class="logo">
        <h1 class="logo-text">教职工管理系统</h1>
      </RouterLink>
      <nav class="nav">
        <RouterLink to="/" class="nav-link">首页</RouterLink>
        <RouterLink to="/staff" class="nav-link">教职工管理</RouterLink>
        <RouterLink to="/departments" class="nav-link">部门管理</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: white;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.5px;
}

.nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: white;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  opacity: 0.9;
}

.nav-link:hover {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
  opacity: 1;
}
</style>
