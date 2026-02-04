import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import teacherService from '../../services/teacherService';
import { toast } from 'react-toastify';

const initialState = {
  teachers: [],
  currentTeacher: null,
  loading: false,
  error: null
};

export const fetchTeachers = createAsyncThunk('teacher/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await teacherService.getAllTeachers();
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch teachers');
  }
});

export const createTeacher = createAsyncThunk('teacher/create', async (data, { rejectWithValue }) => {
  try {
    const response = await teacherService.createTeacher(data);
    toast.success('Teacher created successfully');
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to create teacher');
    return rejectWithValue(error.response?.data?.message);
  }
});

export const updateTeacher = createAsyncThunk('teacher/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await teacherService.updateTeacher(id, data);
    toast.success('Teacher updated successfully');
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update teacher');
    return rejectWithValue(error.response?.data?.message);
  }
});

export const deleteTeacher = createAsyncThunk('teacher/delete', async (id, { rejectWithValue }) => {
  try {
    await teacherService.deleteTeacher(id);
    toast.success('Teacher deleted successfully');
    return id;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to delete teacher');
    return rejectWithValue(error.response?.data?.message);
  }
});

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setCurrentTeacher: (state, action) => { state.currentTeacher = action.payload; },
    clearError: (state) => { state.error = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => { state.loading = true; })
      .addCase(fetchTeachers.fulfilled, (state, action) => { state.loading = false; state.teachers = action.payload; })
      .addCase(fetchTeachers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createTeacher.pending, (state) => { state.loading = true; })
      .addCase(createTeacher.fulfilled, (state, action) => { state.loading = false; state.teachers.push(action.payload); })
      .addCase(createTeacher.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateTeacher.pending, (state) => { state.loading = true; })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.teachers.findIndex(t => t.id === action.payload.id);
        if (index !== -1) state.teachers[index] = action.payload;
      })
      .addCase(updateTeacher.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(deleteTeacher.pending, (state) => { state.loading = true; })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = state.teachers.filter(t => t.id !== action.payload);
      })
      .addCase(deleteTeacher.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export const { setCurrentTeacher, clearError } = teacherSlice.actions;
export default teacherSlice.reducer;
