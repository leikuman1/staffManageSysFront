<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useStaffStore } from '../stores/staff';
import { useDepartmentStore } from '../stores/department';
import type { StaffRequest } from '../api/types';

const route = useRoute();
const router = useRouter();
const staffStore = useStaffStore();
const departmentStore = useDepartmentStore();

const isEdit = computed(() => !!route.params.id);
const formData = ref<StaffRequest>({
  staffNo: '',
  name: '',
  gender: '',
  birthDate: '',
  phone: '',
  email: '',
  idCard: '',
  departmentId: undefined,
  position: '',
  hireDate: '',
  status: '在职',
  address: '',
  isActive: true,
});

onMounted(async () => {
  await departmentStore.fetchAllDepartments();
  
  if (isEdit.value) {
    const id = Number(route.params.id);
    await staffStore.fetchStaffById(id);
    if (staffStore.currentStaff) {
      formData.value = {
        staffNo: staffStore.currentStaff.staffNo,
        name: staffStore.currentStaff.name,
        gender: staffStore.currentStaff.gender || '',
        birthDate: staffStore.currentStaff.birthDate || '',
        phone: staffStore.currentStaff.phone || '',
        email: staffStore.currentStaff.email || '',
        idCard: staffStore.currentStaff.idCard || '',
        departmentId: staffStore.currentStaff.department?.id,
        position: staffStore.currentStaff.position || '',
        hireDate: staffStore.currentStaff.hireDate || '',
        status: staffStore.currentStaff.status || '',
        address: staffStore.currentStaff.address || '',
        isActive: staffStore.currentStaff.isActive,
      };
    }
  }
});

async function handleSubmit() {
  try {
    if (isEdit.value && staffStore.currentStaff?.id) {
      await staffStore.updateStaff(staffStore.currentStaff.id, formData.value);
    } else {
      await staffStore.createStaff(formData.value);
    }
    router.push('/staff');
  } catch (error) {
    console.error('Failed to save staff:', error);
    alert('保存失败，请检查输入信息');
  }
}
</script>

<template>
  <div class="staff-form-page">
    <div class="page-header">
      <RouterLink to="/staff" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        返回列表
      </RouterLink>
      <h1 class="page-title">{{ isEdit ? '编辑教职工' : '添加教职工' }}</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="form-container fluid-card card">
      <div class="form-section">
        <h3 class="section-title">基本信息</h3>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label" for="staffNo">工号 *</label>
            <input
              id="staffNo"
              v-model="formData.staffNo"
              type="text"
              required
              placeholder="请输入工号"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="name">姓名 *</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              placeholder="请输入姓名"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="gender">性别</label>
            <select id="gender" v-model="formData.gender">
              <option value="">请选择</option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="birthDate">出生日期</label>
            <input
              id="birthDate"
              v-model="formData.birthDate"
              type="date"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="idCard">身份证号</label>
            <input
              id="idCard"
              v-model="formData.idCard"
              type="text"
              placeholder="请输入身份证号"
            />
          </div>
        </div>
      </div>

      <div class="form-section">
        <h3 class="section-title">工作信息</h3>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label" for="department">部门</label>
            <select id="department" v-model="formData.departmentId">
              <option :value="undefined">请选择部门</option>
              <option
                v-for="dept in departmentStore.departments"
                :key="dept.id"
                :value="dept.id"
              >
                {{ dept.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="position">职位</label>
            <input
              id="position"
              v-model="formData.position"
              type="text"
              placeholder="请输入职位"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="hireDate">入职日期</label>
            <input
              id="hireDate"
              v-model="formData.hireDate"
              type="date"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="status">在职状态</label>
            <select id="status" v-model="formData.status">
              <option value="在职">在职</option>
              <option value="离职">离职</option>
              <option value="停薪留职">停薪留职</option>
              <option value="退休">退休</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">
              <input
                v-model="formData.isActive"
                type="checkbox"
                style="width: auto; margin-right: 0.5rem"
              />
              激活状态
            </label>
          </div>
        </div>
      </div>

      <div class="form-section">
        <h3 class="section-title">联系方式</h3>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label" for="phone">联系电话</label>
            <input
              id="phone"
              v-model="formData.phone"
              type="tel"
              placeholder="请输入联系电话"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="email">电子邮箱</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="请输入电子邮箱"
            />
          </div>

          <div class="form-group full-width">
            <label class="form-label" for="address">通讯地址</label>
            <input
              id="address"
              v-model="formData.address"
              type="text"
              placeholder="请输入通讯地址"
            />
          </div>
        </div>
      </div>

      <div class="form-actions">
        <RouterLink to="/staff" class="btn btn-secondary">取消</RouterLink>
        <button type="submit" class="btn btn-primary">
          {{ isEdit ? '保存修改' : '创建教职工' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.staff-form-page {
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
