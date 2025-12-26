<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useDepartmentStore } from '../stores/department';
import type { Department } from '../api/types';

const departmentStore = useDepartmentStore();
const searchTerm = ref('');
const showDeleteModal = ref(false);
const deptToDelete = ref<Department | null>(null);

onMounted(() => {
  departmentStore.fetchAllDepartments();
});

const filteredDepartments = computed(() => {
  if (!searchTerm.value) {
    return departmentStore.departments;
  }
  const term = searchTerm.value.toLowerCase();
  return departmentStore.departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(term) ||
      dept.code.toLowerCase().includes(term) ||
      dept.description?.toLowerCase().includes(term)
  );
});

function confirmDelete(dept: Department) {
  deptToDelete.value = dept;
  showDeleteModal.value = true;
}

async function deleteDepartment() {
  if (deptToDelete.value?.id) {
    try {
      await departmentStore.deleteDepartment(deptToDelete.value.id);
      showDeleteModal.value = false;
      deptToDelete.value = null;
    } catch (error) {
      console.error('Failed to delete department:', error);
    }
  }
}

function cancelDelete() {
  showDeleteModal.value = false;
  deptToDelete.value = null;
}
</script>

<template>
  <div class="department-list-page">
    <div class="page-header">
      <h1 class="page-title">部门管理</h1>
      <RouterLink to="/departments/new" class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        添加部门
      </RouterLink>
    </div>

    <div class="search-section card">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="搜索部门名称、编码或描述..."
        class="search-input"
      />
    </div>

    <div v-if="departmentStore.loading" class="loading-container">
      <div class="loading"></div>
      <p>加载中...</p>
    </div>

    <div v-else-if="filteredDepartments.length === 0" class="empty-state card">
      <p>暂无部门信息</p>
    </div>

    <div v-else class="department-grid">
      <div
        v-for="dept in filteredDepartments"
        :key="dept.id"
        class="department-card fluid-card card"
      >
        <div class="dept-header">
          <div class="dept-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          <div class="dept-basic">
            <h3 class="dept-name">{{ dept.name }}</h3>
            <p class="dept-code">编码: {{ dept.code }}</p>
          </div>
          <div v-if="dept.isActive" class="status-badge status-active">启用</div>
          <div v-else class="status-badge status-inactive">停用</div>
        </div>

        <div class="dept-details">
          <div class="detail-item">
            <span class="detail-label">层级:</span>
            <span class="detail-value">第 {{ dept.level }} 级</span>
          </div>
          <div v-if="dept.description" class="detail-item full-width">
            <span class="detail-label">描述:</span>
            <span class="detail-value">{{ dept.description }}</span>
          </div>
        </div>

        <div class="dept-actions">
          <RouterLink :to="`/departments/${dept.id}/edit`" class="btn btn-secondary btn-sm">
            编辑
          </RouterLink>
          <button @click="confirmDelete(dept)" class="btn btn-danger btn-sm">
            删除
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="cancelDelete">
      <div class="modal fluid-card card">
        <h3 class="modal-title">确认删除</h3>
        <p class="modal-text">
          确定要删除 <strong>{{ deptToDelete?.name }}</strong> 吗？此操作不可恢复。
        </p>
        <div class="modal-actions">
          <button @click="cancelDelete" class="btn btn-secondary">取消</button>
          <button @click="deleteDepartment" class="btn btn-danger">确认删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.department-list-page {
  animation: fadeIn 0.5s ease;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  margin: 0;
}

.search-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
}

.search-input {
  font-size: 1.1rem;
  padding: 1rem;
}

.loading-container,
.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
}

.department-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.department-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dept-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.dept-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.dept-basic {
  flex: 1;
  min-width: 0;
}

.dept-name {
  font-size: 1.2rem;
  margin: 0 0 0.25rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dept-code {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
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

.dept-details {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-label {
  font-size: 0.85rem;
  color: var(--text-light);
  font-weight: 500;
}

.detail-value {
  font-size: 0.95rem;
  color: var(--text-primary);
}

.dept-actions {
  display: flex;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  flex: 1;
  justify-content: center;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

.modal {
  max-width: 500px;
  width: 90%;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-title {
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
}

.modal-text {
  color: var(--text-secondary);
  margin: 0 0 1.5rem 0;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
