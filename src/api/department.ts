import apiClient from './client';
import type { ApiResponse, Department, DepartmentRequest } from './types';

export const departmentApi = {
  async getAllDepartments(): Promise<Department[]> {
    const response = await apiClient.get<ApiResponse<Department[]>>('/departments');
    return response.data.data;
  },

  async getDepartmentById(id: number): Promise<Department> {
    const response = await apiClient.get<ApiResponse<Department>>(`/departments/${id}`);
    return response.data.data;
  },

  async getDepartmentByCode(code: string): Promise<Department> {
    const response = await apiClient.get<ApiResponse<Department>>(`/departments/code/${code}`);
    return response.data.data;
  },

  async searchDepartmentsByName(name: string): Promise<Department[]> {
    const response = await apiClient.get<ApiResponse<Department[]>>('/departments/search', {
      params: { name },
    });
    return response.data.data;
  },

  async createDepartment(data: DepartmentRequest): Promise<Department> {
    const response = await apiClient.post<ApiResponse<Department>>('/departments', data);
    return response.data.data;
  },

  async updateDepartment(id: number, data: DepartmentRequest): Promise<Department> {
    const response = await apiClient.put<ApiResponse<Department>>(`/departments/${id}`, data);
    return response.data.data;
  },

  async deleteDepartment(id: number): Promise<void> {
    await apiClient.delete(`/departments/${id}`);
  },
};
