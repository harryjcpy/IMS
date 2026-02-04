// API Constants
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  ME: '/auth/me',
  HEALTH: '/auth/health'
};

// Entity endpoints
export const USER_ENDPOINTS = {
  BASE: '/users',
  BY_ID: (id) => `/users/${id}`
};

export const STUDENT_ENDPOINTS = {
  BASE: '/students',
  BY_ID: (id) => `/students/${id}`
};

export const TEACHER_ENDPOINTS = {
  BASE: '/teachers',
  BY_ID: (id) => `/teachers/${id}`
};

export const ACCOUNTANT_ENDPOINTS = {
  BASE: '/accountants',
  BY_ID: (id) => `/accountants/${id}`
};

export const COURSE_ENDPOINTS = {
  BASE: '/courses',
  BY_ID: (id) => `/courses/${id}`
};

export const EXAM_ENDPOINTS = {
  BASE: '/exams',
  BY_ID: (id) => `/exams/${id}`
};

export const ENROLLMENT_ENDPOINTS = {
  BASE: '/enrollments',
  BY_ID: (id) => `/enrollments/${id}`
};

export const RESULT_ENDPOINTS = {
  BASE: '/results',
  BY_ID: (id) => `/results/${id}`
};

export const ATTENDANCE_ENDPOINTS = {
  BASE: '/attendance',
  BY_ID: (id) => `/attendance/${id}`
};

// Roles
export const ROLES = {
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ACCOUNTANT: 'ACCOUNTANT'
};

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'ims_token',
  USER: 'ims_user'
};

// Route paths
export const ROUTES = {
  LOGIN: '/login',
  ADMIN_DASHBOARD: '/admin',
  STUDENT_DASHBOARD: '/student',
  TEACHER_DASHBOARD: '/teacher',
  ACCOUNTANT_DASHBOARD: '/accountant'
};
