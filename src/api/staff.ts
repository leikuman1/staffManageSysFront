import apiClient from './client';
import type { ApiResponse, Staff, StaffRequest } from './types';

export const staffApi = {
  async getAllStaff(): Promise<Staff[]> {
    const response = await apiClient.get<ApiResponse<Staff[]>>('/staff');
    return response.data.data;
  },

  async getStaffById(id: number): Promise<Staff> {
    const response = await apiClient.get<ApiResponse<Staff>>(`/staff/${id}`);
    return response.data.data;
  },

  async getStaffByStaffNo(staffNo: string): Promise<Staff> {
    const response = await apiClient.get<ApiResponse<Staff>>(`/staff/staffno/${staffNo}`);
    return response.data.data;
  },

  async getStaffByDepartment(departmentId: number): Promise<Staff[]> {
    const response = await apiClient.get<ApiResponse<Staff[]>>(`/staff/department/${departmentId}`);
    return response.data.data;
  },

  async searchStaffByName(name: string): Promise<Staff[]> {
    const response = await apiClient.get<ApiResponse<Staff[]>>('/staff/search', {
      params: { name },
    });
    return response.data.data;
  },

  async createStaff(data: StaffRequest): Promise<Staff> {
    const response = await apiClient.post<ApiResponse<Staff>>('/staff', data);
    return response.data.data;
  },

  async updateStaff(id: number, data: StaffRequest): Promise<Staff> {
    const response = await apiClient.put<ApiResponse<Staff>>(`/staff/${id}`, data);
    return response.data.data;
  },

  async deleteStaff(id: number): Promise<void> {
    await apiClient.delete(`/staff/${id}`);
  },
};
