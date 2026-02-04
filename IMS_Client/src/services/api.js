import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { getToken, clearAuthData } from '../utils/helpers';
import { toast } from 'react-toastify';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Handle 401 Unauthorized - token expired or invalid
      if (status === 401) {
        clearAuthData();
        window.location.href = '/login';
        toast.error('Session expired. Please login again.');
      }
      
      // Handle 403 Forbidden - insufficient permissions
      else if (status === 403) {
        toast.error('You do not have permission to perform this action.');
      }
      
      // Handle 404 Not Found
      else if (status === 404) {
        toast.error(data.message || 'Resource not found.');
      }
      
      // Handle 500 Internal Server Error
      else if (status === 500) {
        toast.error('Server error. Please try again later.');
      }
      
      // Handle other errors
      else {
        toast.error(data.message || 'An error occurred.');
      }
    } else if (error.request) {
      // Request made but no response received
      toast.error('Network error. Please check your connection.');
    } else {
      // Something else happened
      toast.error('An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);

export default api;
