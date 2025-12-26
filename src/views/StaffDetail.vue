<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useStaffStore } from '../stores/staff';

const route = useRoute();
const router = useRouter();
const staffStore = useStaffStore();
const loading = ref(true);

onMounted(async () => {
  const id = Number(route.params.id);
  await staffStore.fetchStaffById(id);
  loading.value = false;
});

function formatDate(dateString?: string) {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('zh-CN');
}

async function handleDelete() {
  if (staffStore.currentStaff?.id && confirm('确定要删除此教职工信息吗？')) {
    await staffStore.deleteStaff(staffStore.currentStaff.id);
    router.push('/staff');
  }
}
</script>

<template>
  <div class="staff-detail-page">
    <div class="page-header">
      <RouterLink to="/staff" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        返回列表
      </RouterLink>
      <h1 class="page-title">教职工详情</h1>
      <div class="header-actions">
        <RouterLink
          v-if="staffStore.currentStaff"
          :to="`/staff/${staffStore.currentStaff.id}/edit`"
          class="btn btn-secondary"
        >
          编辑
        </RouterLink>
        <button @click="handleDelete" class="btn btn-danger">删除</button>
      </div>
    </div>

    <div v-if="loading" class="loading-container">
      <div class="loading"></div>
      <p>加载中...</p>
    </div>

    <div v-else-if="staffStore.currentStaff" class="detail-content">
      <div class="detail-card fluid-card card">
        <div class="detail-header">
          <div class="avatar-large">
            {{ staffStore.currentStaff.name.charAt(0) }}
          </div>
          <div class="header-info">
            <h2 class="staff-name-large">{{ staffStore.currentStaff.name }}</h2>
            <p class="staff-no-large">工号: {{ staffStore.currentStaff.staffNo }}</p>
            <div v-if="staffStore.currentStaff.isActive" class="status-badge status-active">在职</div>
            <div v-else class="status-badge status-inactive">离职</div>
          </div>
        </div>

        <div class="detail-grid">
          <div class="detail-section">
            <h3 class="section-title">基本信息</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">姓名</span>
                <span class="info-value">{{ staffStore.currentStaff.name }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">工号</span>
                <span class="info-value">{{ staffStore.currentStaff.staffNo }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">性别</span>
                <span class="info-value">{{ staffStore.currentStaff.gender || '-' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">出生日期</span>
                <span class="info-value">{{ formatDate(staffStore.currentStaff.birthDate) }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">身份证号</span>
                <span class="info-value">{{ staffStore.currentStaff.idCard || '-' }}</span>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h3 class="section-title">工作信息</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">部门</span>
                <span class="info-value">{{ staffStore.currentStaff.department?.name || '-' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">职位</span>
                <span class="info-value">{{ staffStore.currentStaff.position || '-' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">入职日期</span>
                <span class="info-value">{{ formatDate(staffStore.currentStaff.hireDate) }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">状态</span>
                <span class="info-value">{{ staffStore.currentStaff.status || '-' }}</span>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h3 class="section-title">联系方式</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">联系电话</span>
                <span class="info-value">{{ staffStore.currentStaff.phone || '-' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">电子邮箱</span>
                <span class="info-value">{{ staffStore.currentStaff.email || '-' }}</span>
              </div>
              <div class="info-item full-width">
                <span class="info-label">通讯地址</span>
                <span class="info-value">{{ staffStore.currentStaff.address || '-' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.staff-detail-page {
  animation: fadeIn 0.5s ease;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--primary-color);
}

.page-title {
  font-size: 2rem;
  margin: 0;
  flex: 1;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.loading-container {
  text-align: center;
  padding: 3rem;
}

.detail-card {
  padding: 2rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--border-color);
  margin-bottom: 2rem;
}

.avatar-large {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 600;
}

.header-info {
  flex: 1;
}

.staff-name-large {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
}

.staff-no-large {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin: 0 0 1rem 0;
}

.status-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
}

.status-active {
  background-color: #c6f6d5;
  color: #22543d;
}

.status-inactive {
  background-color: #fed7d7;
  color: #742a2a;
}

.detail-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.detail-section {
  padding: 1.5rem;
  background-color: var(--bg-secondary);
  border-radius: 12px;
}

.section-title {
  font-size: 1.3rem;
  margin: 0 0 1.5rem 0;
  color: var(--text-primary);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-label {
  font-size: 0.9rem;
  color: var(--text-light);
  font-weight: 500;
}

.info-value {
  font-size: 1.05rem;
  color: var(--text-primary);
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
</style>
