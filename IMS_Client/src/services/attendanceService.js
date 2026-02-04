import api from './api';
import { ATTENDANCE_ENDPOINTS } from '../utils/constants';

const attendanceService = {
  getAllAttendance: async () => {
    const response = await api.get(ATTENDANCE_ENDPOINTS.BASE);
    return response.data;
  },

  getAttendanceById: async (id) => {
    const response = await api.get(ATTENDANCE_ENDPOINTS.BY_ID(id));
    return response.data;
  },

  createAttendance: async (attendanceData) => {
    const response = await api.post(ATTENDANCE_ENDPOINTS.BASE, attendanceData);
    return response.data;
  },

  updateAttendance: async (id, attendanceData) => {
    const response = await api.put(ATTENDANCE_ENDPOINTS.BY_ID(id), attendanceData);
    return response.data;
  },

  deleteAttendance: async (id) => {
    const response = await api.delete(ATTENDANCE_ENDPOINTS.BY_ID(id));
    return response.data;
  }
};

export default attendanceService;
