import api from './api';
import { USER_ENDPOINTS } from '../utils/constants';

const userService = {
  getAllUsers: async () => {
    const response = await api.get(USER_ENDPOINTS.BASE);
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(USER_ENDPOINTS.BY_ID(id));
    return response.data;
  },

  createUser: async (userData) => {
    const response = await api.post(USER_ENDPOINTS.BASE, userData);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await api.put(USER_ENDPOINTS.BY_ID(id), userData);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(USER_ENDPOINTS.BY_ID(id));
    return response.data;
  },

  changePassword: async (userId, oldPassword, newPassword) => {
    const response = await api.put(`${USER_ENDPOINTS.BASE}/${userId}/change-password`, {
      oldPassword,
      newPassword
    });
    return response.data;
  }
};

export default userService;
