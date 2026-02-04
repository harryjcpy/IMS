import api from './api';

const FEE_ENDPOINTS = {
  BASE: '/fees',
  BY_ID: (id) => `/fees/${id}`,
  BY_STUDENT: (studentId) => `/fees/student/${studentId}`,
  BY_STATUS: (status) => `/fees/status/${status}`,
  PAYMENT: (id) => `/fees/${id}/payment`
};

const feeService = {
  getAllFees: async () => {
    const response = await api.get(FEE_ENDPOINTS.BASE);
    return response.data;
  },

  getFeeById: async (id) => {
    const response = await api.get(FEE_ENDPOINTS.BY_ID(id));
    return response.data;
  },

  getFeesByStudent: async (studentId) => {
    const response = await api.get(FEE_ENDPOINTS.BY_STUDENT(studentId));
    return response.data;
  },

  getFeesByStatus: async (status) => {
    const response = await api.get(FEE_ENDPOINTS.BY_STATUS(status));
    return response.data;
  },

  createFee: async (feeData) => {
    const response = await api.post(FEE_ENDPOINTS.BASE, feeData);
    return response.data;
  },

  updateFee: async (id, feeData) => {
    const response = await api.put(FEE_ENDPOINTS.BY_ID(id), feeData);
    return response.data;
  },

  recordPayment: async (id, paymentDate) => {
    const response = await api.post(FEE_ENDPOINTS.PAYMENT(id), { paymentDate });
    return response.data;
  },

  deleteFee: async (id) => {
    const response = await api.delete(FEE_ENDPOINTS.BY_ID(id));
    return response.data;
  }
};

export default feeService;
