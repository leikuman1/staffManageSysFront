<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useStaffStore } from '../stores/staff';
import { useDepartmentStore } from '../stores/department';

const staffStore = useStaffStore();
const departmentStore = useDepartmentStore();
const stats = ref({
  totalStaff: 0,
  totalDepartments: 0,
  activeStaff: 0,
});

onMounted(async () => {
  await Promise.all([
    staffStore.fetchAllStaff(),
    departmentStore.fetchAllDepartments()
  ]);
  
  stats.value = {
    totalStaff: staffStore.staffList.length,
    totalDepartments: departmentStore.departments.length,
    activeStaff: staffStore.staffList.filter(s => s.isActive).length,
  };
});
</script>

<template>
  <div class="dashboard">
    <div class="welcome-section fluid-card card">
      <h1 class="welcome-title">欢迎使用教职工管理系统</h1>
      <p class="welcome-subtitle">现代化、高效的教职工信息管理平台</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card fluid-card card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div class="stat-info">
          <h3 class="stat-value">{{ stats.totalStaff }}</h3>
          <p class="stat-label">教职工总数</p>
        </div>
      </div>

      <div class="stat-card fluid-card card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <polyline points="17 11 19 13 23 9"></polyline>
          </svg>
        </div>
        <div class="stat-info">
          <h3 class="stat-value">{{ stats.activeStaff }}</h3>
          <p class="stat-label">在职人员</p>
        </div>
      </div>

      <div class="stat-card fluid-card card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <div class="stat-info">
          <h3 class="stat-value">{{ stats.totalDepartments }}</h3>
          <p class="stat-label">部门数量</p>
        </div>
      </div>
    </div>

    <div class="quick-actions">
      <h2 class="section-title">快速操作</h2>
      <div class="actions-grid">
        <RouterLink to="/staff/new" class="action-card fluid-card card">
          <div class="action-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
          </div>
          <h3 class="action-title">添加教职工</h3>
          <p class="action-desc">录入新的教职工信息</p>
        </RouterLink>

        <RouterLink to="/staff" class="action-card fluid-card card">
          <div class="action-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <h3 class="action-title">查看教职工</h3>
          <p class="action-desc">浏览和搜索教职工信息</p>
        </RouterLink>

        <RouterLink to="/departments/new" class="action-card fluid-card card">
          <div class="action-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          <h3 class="action-title">添加部门</h3>
          <p class="action-desc">创建新的组织部门</p>
        </RouterLink>

        <RouterLink to="/departments" class="action-card fluid-card card">
          <div class="action-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 3h18v18H3zM3 9h18M9 21V9"></path>
            </svg>
          </div>
          <h3 class="action-title">管理部门</h3>
          <p class="action-desc">查看和管理组织架构</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.welcome-section {
  text-align: center;
  padding: 3rem 2rem;
  margin-bottom: 2rem;
}

.welcome-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.welcome-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
}

.stat-icon {
  width: 70px;
  height: 70px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
}

.stat-label {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0.25rem 0 0 0;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.action-card {
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.action-card:hover {
  transform: translateY(-5px) scale(1.02);
}

.action-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.action-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.action-desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0;
}
</style>
