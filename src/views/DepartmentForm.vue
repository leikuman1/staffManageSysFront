<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useDepartmentStore } from '../stores/department';
import type { DepartmentRequest } from '../api/types';

const route = useRoute();
const router = useRouter();
const departmentStore = useDepartmentStore();

const isEdit = computed(() => !!route.params.id);
const formData = ref<DepartmentRequest>({
  code: '',
  name: '',
  description: '',
  parentId: undefined,
  level: 1,
  isActive: true,
});

onMounted(async () => {
  await departmentStore.fetchAllDepartments();
  
  if (isEdit.value) {
    const id = Number(route.params.id);
    await departmentStore.fetchDepartmentById(id);
    if (departmentStore.currentDepartment) {
      formData.value = {
        code: departmentStore.currentDepartment.code,
        name: departmentStore.currentDepartment.name,
        description: departmentStore.currentDepartment.description || '',
        parentId: departmentStore.currentDepartment.parentId,
        level: departmentStore.currentDepartment.level,
        isActive: departmentStore.currentDepartment.isActive,
      };
    }
  }
});

async function handleSubmit() {
  try {
    if (isEdit.value && departmentStore.currentDepartment?.id) {
      await departmentStore.updateDepartment(
        departmentStore.currentDepartment.id,
        formData.value
      );
    } else {
      await departmentStore.createDepartment(formData.value);
    }
    router.push('/departments');
  } catch (error) {
    console.error('Failed to save department:', error);
    alert('保存失败，请检查输入信息');
  }
}

const availableParents = computed(() => {
  if (!isEdit.value) {
    return departmentStore.departments;
  }
  return departmentStore.departments.filter(
    (d) => d.id !== departmentStore.currentDepartment?.id
  );
});
</script>

<template>
  <div class="department-form-page">
    <div class="page-header">
      <RouterLink to="/departments" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        返回列表
      </RouterLink>
      <h1 class="page-title">{{ isEdit ? '编辑部门' : '添加部门' }}</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="form-container fluid-card card">
      <div class="form-section">
        <h3 class="section-title">部门信息</h3>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label" for="code">部门编码 *</label>
            <input
              id="code"
              v-model="formData.code"
              type="text"
              required
              placeholder="请输入部门编码"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="name">部门名称 *</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              placeholder="请输入部门名称"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="level">部门层级</label>
            <input
              id="level"
              v-model.number="formData.level"
              type="number"
              min="1"
              placeholder="请输入部门层级"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="parentId">上级部门</label>
            <select id="parentId" v-model="formData.parentId">
              <option :value="undefined">无上级部门</option>
              <option
                v-for="dept in availableParents"
                :key="dept.id"
                :value="dept.id"
              >
                {{ dept.name }}
              </option>
            </select>
          </div>

          <div class="form-group full-width">
            <label class="form-label" for="description">部门描述</label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="3"
              placeholder="请输入部门描述"
            ></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">
              <input
                v-model="formData.isActive"
                type="checkbox"
                style="width: auto; margin-right: 0.5rem"
              />
              启用状态
            </label>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <RouterLink to="/departments" class="btn btn-secondary">取消</RouterLink>
        <button type="submit" class="btn btn-primary">
          {{ isEdit ? '保存修改' : '创建部门' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.department-form-page {
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
}

.back-link:hover {
  color: var(--primary-color);
}

.page-title {
  font-size: 2rem;
  margin: 0;
}

.form-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.form-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.3rem;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--border-color);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
}

textarea {
  font-family: inherit;
  font-size: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  transition: all 0.2s ease;
  width: 100%;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  resize: vertical;
}

textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid var(--border-color);
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
