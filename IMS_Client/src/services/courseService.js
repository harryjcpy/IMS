import api from './api';
import { COURSE_ENDPOINTS } from '../utils/constants';

const courseService = {
  getAllCourses: async () => {
    const response = await api.get(COURSE_ENDPOINTS.BASE);
    return response.data;
  },

  getCourseById: async (id) => {
    const response = await api.get(COURSE_ENDPOINTS.BY_ID(id));
    return response.data;
  },

  createCourse: async (courseData) => {
    const response = await api.post(COURSE_ENDPOINTS.BASE, courseData);
    return response.data;
  },

  updateCourse: async (id, courseData) => {
    const response = await api.put(COURSE_ENDPOINTS.BY_ID(id), courseData);
    return response.data;
  },

  deleteCourse: async (id) => {
    const response = await api.delete(COURSE_ENDPOINTS.BY_ID(id));
    return response.data;
  }
};

export default courseService;
