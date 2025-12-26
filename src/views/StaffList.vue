<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useStaffStore } from '../stores/staff';
import { useDepartmentStore } from '../stores/department';
import type { Staff } from '../api/types';

const staffStore = useStaffStore();
const departmentStore = useDepartmentStore();
const searchTerm = ref('');
const showDeleteModal = ref(false);
const staffToDelete = ref<Staff | null>(null);

onMounted(async () => {
  await Promise.all([
    staffStore.fetchAllStaff(),
    departmentStore.fetchAllDepartments()
  ]);
});

const filteredStaff = computed(() => {
  if (!searchTerm.value) {
    return staffStore.staffList;
  }
  const term = searchTerm.value.toLowerCase();
  return staffStore.staffList.filter(
    (staff) =>
      staff.name.toLowerCase().includes(term) ||
      staff.staffNo.toLowerCase().includes(term) ||
      staff.department?.name.toLowerCase().includes(term) ||
      staff.position?.toLowerCase().includes(term)
  );
});

function confirmDelete(staff: Staff) {
  staffToDelete.value = staff;
  showDeleteModal.value = true;
}

async function deleteStaff() {
  if (staffToDelete.value?.id) {
    try {
      await staffStore.deleteStaff(staffToDelete.value.id);
      showDeleteModal.value = false;
      staffToDelete.value = null;
    } catch (error) {
      console.error('Failed to delete staff:', error);
    }
  }
}

function cancelDelete() {
  showDeleteModal.value = false;
  staffToDelete.value = null;
}

function formatDate(dateString?: string) {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('zh-CN');
}
</script>

<template>
  <div class="staff-list-page">
    <div class="page-header">
      <h1 class="page-title">教职工管理</h1>
      <RouterLink to="/staff/new" class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        添加教职工
      </RouterLink>
    </div>

    <div class="search-section card">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="搜索教职工姓名、工号、部门或职位..."
        class="search-input"
      />
    </div>

    <div v-if="staffStore.loading" class="loading-container">
      <div class="loading"></div>
      <p>加载中...</p>
    </div>

    <div v-else-if="filteredStaff.length === 0" class="empty-state card">
      <p>暂无教职工信息</p>
    </div>

    <div v-else class="staff-grid">
      <div
        v-for="staff in filteredStaff"
        :key="staff.id"
        class="staff-card fluid-card card"
      >
        <div class="staff-header">
          <div class="staff-avatar">
            {{ staff.name.charAt(0) }}
          </div>
          <div class="staff-basic">
            <h3 class="staff-name">{{ staff.name }}</h3>
            <p class="staff-no">工号: {{ staff.staffNo }}</p>
          </div>
          <div v-if="staff.isActive" class="status-badge status-active">在职</div>
          <div v-else class="status-badge status-inactive">离职</div>
        </div>

        <div class="staff-details">
          <div class="detail-item">
            <span class="detail-label">部门:</span>
            <span class="detail-value">{{ staff.department?.name || '-' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">职位:</span>
            <span class="detail-value">{{ staff.position || '-' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">性别:</span>
            <span class="detail-value">{{ staff.gender || '-' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">入职日期:</span>
            <span class="detail-value">{{ formatDate(staff.hireDate) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">联系电话:</span>
            <span class="detail-value">{{ staff.phone || '-' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">邮箱:</span>
            <span class="detail-value">{{ staff.email || '-' }}</span>
          </div>
        </div>

        <div class="staff-actions">
          <RouterLink :to="`/staff/${staff.id}`" class="btn btn-secondary btn-sm">
            查看详情
          </RouterLink>
          <RouterLink :to="`/staff/${staff.id}/edit`" class="btn btn-secondary btn-sm">
            编辑
          </RouterLink>
          <button @click="confirmDelete(staff)" class="btn btn-danger btn-sm">
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
          确定要删除 <strong>{{ staffToDelete?.name }}</strong> 的信息吗？此操作不可恢复。
        </p>
        <div class="modal-actions">
          <button @click="cancelDelete" class="btn btn-secondary">取消</button>
          <button @click="deleteStaff" class="btn btn-danger">确认删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.staff-list-page {
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

.loading-container {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
}

.staff-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.staff-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.staff-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.staff-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  flex-shrink: 0;
}

.staff-basic {
  flex: 1;
  min-width: 0;
}

.staff-name {
  font-size: 1.2rem;
  margin: 0 0 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.staff-no {
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

.staff-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.85rem;
  color: var(--text-light);
  font-weight: 500;
}

.detail-value {
  font-size: 0.95rem;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.staff-actions {
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
  line-height: 1.6;
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
