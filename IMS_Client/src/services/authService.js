import api from './api';
import { AUTH_ENDPOINTS } from '../utils/constants';

const authService = {
  // Login
  login: async (credentials) => {
    const response = await api.post(AUTH_ENDPOINTS.LOGIN, credentials);
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get(AUTH_ENDPOINTS.ME);
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get(AUTH_ENDPOINTS.HEALTH);
    return response.data;
  }
};

export default authService;
