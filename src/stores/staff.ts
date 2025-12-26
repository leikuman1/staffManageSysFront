import { defineStore } from 'pinia';
import { ref } from 'vue';
import { staffApi } from '../api/staff';
import type { Staff, StaffRequest } from '../api/types';

export const useStaffStore = defineStore('staff', () => {
  const staffList = ref<Staff[]>([]);
  const currentStaff = ref<Staff | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchAllStaff() {
    loading.value = true;
    error.value = null;
    try {
      staffList.value = await staffApi.getAllStaff();
    } catch (e) {
      error.value = 'Failed to fetch staff list';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  async function fetchStaffById(id: number) {
    loading.value = true;
    error.value = null;
    try {
      currentStaff.value = await staffApi.getStaffById(id);
    } catch (e) {
      error.value = 'Failed to fetch staff details';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  async function searchStaff(name: string) {
    loading.value = true;
    error.value = null;
    try {
      staffList.value = await staffApi.searchStaffByName(name);
    } catch (e) {
      error.value = 'Failed to search staff';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  async function createStaff(data: StaffRequest) {
    loading.value = true;
    error.value = null;
    try {
      const newStaff = await staffApi.createStaff(data);
      staffList.value.push(newStaff);
      return newStaff;
    } catch (e) {
      error.value = 'Failed to create staff';
      console.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function updateStaff(id: number, data: StaffRequest) {
    loading.value = true;
    error.value = null;
    try {
      const updatedStaff = await staffApi.updateStaff(id, data);
      const index = staffList.value.findIndex((s) => s.id === id);
      if (index !== -1) {
        staffList.value[index] = updatedStaff;
      }
      return updatedStaff;
    } catch (e) {
      error.value = 'Failed to update staff';
      console.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function deleteStaff(id: number) {
    loading.value = true;
    error.value = null;
    try {
      await staffApi.deleteStaff(id);
      staffList.value = staffList.value.filter((s) => s.id !== id);
    } catch (e) {
      error.value = 'Failed to delete staff';
      console.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    staffList,
    currentStaff,
    loading,
    error,
    fetchAllStaff,
    fetchStaffById,
    searchStaff,
    createStaff,
    updateStaff,
    deleteStaff,
  };
});
