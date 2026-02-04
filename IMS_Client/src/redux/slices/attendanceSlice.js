import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import attendanceService from '../../services/attendanceService';
import { toast } from 'react-toastify';

const initialState = {
  attendance: [],
  currentAttendance: null,
  loading: false,
  error: null
};

export const fetchAttendance = createAsyncThunk('attendance/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await attendanceService.getAllAttendance();
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch attendance');
  }
});

export const createAttendance = createAsyncThunk('attendance/create', async (data, { rejectWithValue }) => {
  try {
    const response = await attendanceService.createAttendance(data);
    toast.success('Attendance marked successfully');
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to mark attendance');
    return rejectWithValue(error.response?.data?.message);
  }
});

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendance.pending, (state) => { state.loading = true; })
      .addCase(fetchAttendance.fulfilled, (state, action) => { state.loading = false; state.attendance = action.payload; })
      .addCase(fetchAttendance.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createAttendance.pending, (state) => { state.loading = true; })
      .addCase(createAttendance.fulfilled, (state, action) => { state.loading = false; state.attendance.push(action.payload); })
      .addCase(createAttendance.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export const { clearError } = attendanceSlice.actions;
export default attendanceSlice.reducer;
