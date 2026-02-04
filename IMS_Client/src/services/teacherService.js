import api from './api';
import { TEACHER_ENDPOINTS } from '../utils/constants';

const teacherService = {
  getAllTeachers: async () => {
    const response = await api.get(TEACHER_ENDPOINTS.BASE);
    return response.data;
  },

  getTeacherById: async (id) => {
    const response = await api.get(TEACHER_ENDPOINTS.BY_ID(id));
    return response.data;
  },

  createTeacher: async (teacherData) => {
    const response = await api.post(TEACHER_ENDPOINTS.BASE, teacherData);
    return response.data;
  },

  updateTeacher: async (id, teacherData) => {
    const response = await api.put(TEACHER_ENDPOINTS.BY_ID(id), teacherData);
    return response.data;
  },

  deleteTeacher: async (id) => {
    const response = await api.delete(TEACHER_ENDPOINTS.BY_ID(id));
    return response.data;
  }
};

export default teacherService;
