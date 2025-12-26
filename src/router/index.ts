import { createRouter, createWebHistory } from 'vue-router';
import StaffList from '../views/StaffList.vue';
import StaffDetail from '../views/StaffDetail.vue';
import StaffForm from '../views/StaffForm.vue';
import DepartmentList from '../views/DepartmentList.vue';
import DepartmentForm from '../views/DepartmentForm.vue';
import Dashboard from '../views/Dashboard.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/staff',
      name: 'StaffList',
      component: StaffList,
    },
    {
      path: '/staff/new',
      name: 'StaffNew',
      component: StaffForm,
    },
    {
      path: '/staff/:id',
      name: 'StaffDetail',
      component: StaffDetail,
    },
    {
      path: '/staff/:id/edit',
      name: 'StaffEdit',
      component: StaffForm,
    },
    {
      path: '/departments',
      name: 'DepartmentList',
      component: DepartmentList,
    },
    {
      path: '/departments/new',
      name: 'DepartmentNew',
      component: DepartmentForm,
    },
    {
      path: '/departments/:id/edit',
      name: 'DepartmentEdit',
      component: DepartmentForm,
    },
  ],
});

export default router;
