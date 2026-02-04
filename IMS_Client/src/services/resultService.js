import api from './api';
import { RESULT_ENDPOINTS } from '../utils/constants';

const resultService = {
  getAllResults: async () => {
    const response = await api.get(RESULT_ENDPOINTS.BASE);
    return response.data;
  },

  getResultById: async (id) => {
    const response = await api.get(RESULT_ENDPOINTS.BY_ID(id));
    return response.data;
  },

  createResult: async (resultData) => {
    const response = await api.post(RESULT_ENDPOINTS.BASE, resultData);
    return response.data;
  },

  updateResult: async (id, resultData) => {
    const response = await api.put(RESULT_ENDPOINTS.BY_ID(id), resultData);
    return response.data;
  },

  deleteResult: async (id) => {
    const response = await api.delete(RESULT_ENDPOINTS.BY_ID(id));
    return response.data;
  }
};

export default resultService;
