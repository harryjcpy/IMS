import { STORAGE_KEYS } from './constants';

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

// Set token in localStorage
export const setToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

// Remove token from localStorage
export const removeToken = () => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

// Get user from localStorage
export const getUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

// Set user in localStorage
export const setUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

// Remove user from localStorage
export const removeUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// Clear all auth data
export const clearAuthData = () => {
  removeToken();
  removeUser();
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Get user role
export const getUserRole = () => {
  const user = getUser();
  return user?.role || null;
};

// Format date
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-IN');
};

// Calculate attendance percentage
export const calculateAttendancePercentage = (attendanceRecords) => {
  if (!attendanceRecords || attendanceRecords.length === 0) return 0;
  const presentCount = attendanceRecords.filter(record => record.status === 'PRESENT').length;
  return ((presentCount / attendanceRecords.length) * 100).toFixed(2);
};
