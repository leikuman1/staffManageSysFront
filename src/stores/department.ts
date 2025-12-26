import { defineStore } from 'pinia';
import { ref } from 'vue';
import { departmentApi } from '../api/department';
import type { Department, DepartmentRequest } from '../api/types';

export const useDepartmentStore = defineStore('department', () => {
  const departments = ref<Department[]>([]);
  const currentDepartment = ref<Department | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchAllDepartments() {
    loading.value = true;
    error.value = null;
    try {
      departments.value = await departmentApi.getAllDepartments();
    } catch (e) {
      error.value = 'Failed to fetch departments';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  async function fetchDepartmentById(id: number) {
    loading.value = true;
    error.value = null;
    try {
      currentDepartment.value = await departmentApi.getDepartmentById(id);
    } catch (e) {
      error.value = 'Failed to fetch department details';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  async function searchDepartments(name: string) {
    loading.value = true;
    error.value = null;
    try {
      departments.value = await departmentApi.searchDepartmentsByName(name);
    } catch (e) {
      error.value = 'Failed to search departments';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  async function createDepartment(data: DepartmentRequest) {
    loading.value = true;
    error.value = null;
    try {
      const newDept = await departmentApi.createDepartment(data);
      departments.value.push(newDept);
      return newDept;
    } catch (e) {
      error.value = 'Failed to create department';
      console.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function updateDepartment(id: number, data: DepartmentRequest) {
    loading.value = true;
    error.value = null;
    try {
      const updatedDept = await departmentApi.updateDepartment(id, data);
      const index = departments.value.findIndex((d) => d.id === id);
      if (index !== -1) {
        departments.value[index] = updatedDept;
      }
      return updatedDept;
    } catch (e) {
      error.value = 'Failed to update department';
      console.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function deleteDepartment(id: number) {
    loading.value = true;
    error.value = null;
    try {
      await departmentApi.deleteDepartment(id);
      departments.value = departments.value.filter((d) => d.id !== id);
    } catch (e) {
      error.value = 'Failed to delete department';
      console.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    departments,
    currentDepartment,
    loading,
    error,
    fetchAllDepartments,
    fetchDepartmentById,
    searchDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
  };
});
