import api from './api';
import { ENROLLMENT_ENDPOINTS } from '../utils/constants';

const enrollmentService = {
  getAllEnrollments: async () => {
    const response = await api.get(ENROLLMENT_ENDPOINTS.BASE);
    return response.data;
  },

  getEnrollmentById: async (id) => {
    const response = await api.get(ENROLLMENT_ENDPOINTS.BY_ID(id));
    return response.data;
  },

  createEnrollment: async (enrollmentData) => {
    const response = await api.post(ENROLLMENT_ENDPOINTS.BASE, enrollmentData);
    return response.data;
  },

  updateEnrollment: async (id, enrollmentData) => {
    const response = await api.put(ENROLLMENT_ENDPOINTS.BY_ID(id), enrollmentData);
    return response.data;
  },

  deleteEnrollment: async (id) => {
    const response = await api.delete(ENROLLMENT_ENDPOINTS.BY_ID(id));
    return response.data;
  }
};

export default enrollmentService;
