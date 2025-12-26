export interface Department {
  id?: number;
  code: string;
  name: string;
  description?: string;
  parentId?: number;
  level: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Staff {
  id?: number;
  staffNo: string;
  name: string;
  gender?: string;
  birthDate?: string;
  phone?: string;
  email?: string;
  idCard?: string;
  department?: Department;
  position?: string;
  hireDate?: string;
  status?: string;
  address?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface StaffRequest {
  staffNo: string;
  name: string;
  gender?: string;
  birthDate?: string;
  phone?: string;
  email?: string;
  idCard?: string;
  departmentId?: number;
  position?: string;
  hireDate?: string;
  status?: string;
  address?: string;
  isActive?: boolean;
}

export interface DepartmentRequest {
  code: string;
  name: string;
  description?: string;
  parentId?: number;
  level?: number;
  isActive?: boolean;
}
