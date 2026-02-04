import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import enrollmentService from '../../services/enrollmentService';
import { toast } from 'react-toastify';

const initialState = {
  enrollments: [],
  currentEnrollment: null,
  loading: false,
  error: null
};

export const fetchEnrollments = createAsyncThunk('enrollment/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await enrollmentService.getAllEnrollments();
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch enrollments');
  }
});

export const createEnrollment = createAsyncThunk('enrollment/create', async (data, { rejectWithValue }) => {
  try {
    const response = await enrollmentService.createEnrollment(data);
    toast.success('Enrollment created successfully');
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to create enrollment');
    return rejectWithValue(error.response?.data?.message);
  }
});

export const deleteEnrollment = createAsyncThunk('enrollment/delete', async (id, { rejectWithValue }) => {
  try {
    await enrollmentService.deleteEnrollment(id);
    toast.success('Enrollment deleted successfully');
    return id;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to delete enrollment');
    return rejectWithValue(error.response?.data?.message);
  }
});

const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollments.pending, (state) => { state.loading = true; })
      .addCase(fetchEnrollments.fulfilled, (state, action) => { state.loading = false; state.enrollments = action.payload; })
      .addCase(fetchEnrollments.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createEnrollment.pending, (state) => { state.loading = true; })
      .addCase(createEnrollment.fulfilled, (state, action) => { state.loading = false; state.enrollments.push(action.payload); })
      .addCase(createEnrollment.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(deleteEnrollment.pending, (state) => { state.loading = true; })
      .addCase(deleteEnrollment.fulfilled, (state, action) => { 
        state.loading = false; 
        state.enrollments = state.enrollments.filter(e => e.id !== action.payload);
      })
      .addCase(deleteEnrollment.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export const { clearError } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
