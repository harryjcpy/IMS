import api from './api';
import { ACCOUNTANT_ENDPOINTS } from '../utils/constants';

const accountantService = {
  getAllAccountants: async () => {
    const response = await api.get(ACCOUNTANT_ENDPOINTS.BASE);
    return response.data;
  },

  getAccountantById: async (id) => {
    const response = await api.get(ACCOUNTANT_ENDPOINTS.BY_ID(id));
    return response.data;
  },

  createAccountant: async (accountantData) => {
    const response = await api.post(ACCOUNTANT_ENDPOINTS.BASE, accountantData);
    return response.data;
  },

  updateAccountant: async (id, accountantData) => {
    const response = await api.put(ACCOUNTANT_ENDPOINTS.BY_ID(id), accountantData);
    return response.data;
  },

  deleteAccountant: async (id) => {
    const response = await api.delete(ACCOUNTANT_ENDPOINTS.BY_ID(id));
    return response.data;
  }
};

export default accountantService;
