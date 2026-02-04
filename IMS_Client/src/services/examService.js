import api from './api';
import { EXAM_ENDPOINTS } from '../utils/constants';

const examService = {
  getAllExams: async () => {
    const response = await api.get(EXAM_ENDPOINTS.BASE);
    return response.data;
  },

  getExamById: async (id) => {
    const response = await api.get(EXAM_ENDPOINTS.BY_ID(id));
    return response.data;
  },

  createExam: async (examData) => {
    const response = await api.post(EXAM_ENDPOINTS.BASE, examData);
    return response.data;
  },

  updateExam: async (id, examData) => {
    const response = await api.put(EXAM_ENDPOINTS.BY_ID(id), examData);
    return response.data;
  },

  deleteExam: async (id) => {
    const response = await api.delete(EXAM_ENDPOINTS.BY_ID(id));
    return response.data;
  }
};

export default examService;
