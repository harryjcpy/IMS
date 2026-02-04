import api from './api';
import { STUDENT_ENDPOINTS } from '../utils/constants';

const studentService = {
  getAllStudents: async () => {
    const response = await api.get(STUDENT_ENDPOINTS.BASE);
    return response.data;
  },

  getStudentById: async (id) => {
    const response = await api.get(STUDENT_ENDPOINTS.BY_ID(id));
    return response.data;
  },

  createStudent: async (studentData) => {
    const response = await api.post(STUDENT_ENDPOINTS.BASE, studentData);
    return response.data;
  },

  updateStudent: async (id, studentData) => {
    const response = await api.put(STUDENT_ENDPOINTS.BY_ID(id), studentData);
    return response.data;
  },

  deleteStudent: async (id) => {
    const response = await api.delete(STUDENT_ENDPOINTS.BY_ID(id));
    return response.data;
  }
};

export default studentService;
