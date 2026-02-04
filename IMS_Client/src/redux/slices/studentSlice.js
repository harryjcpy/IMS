import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import studentService from '../../services/studentService';
import { toast } from 'react-toastify';

const initialState = {
  students: [],
  currentStudent: null,
  loading: false,
  error: null
};

export const fetchStudents = createAsyncThunk('student/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await studentService.getAllStudents();
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch students');
  }
});

export const createStudent = createAsyncThunk('student/create', async (data, { rejectWithValue }) => {
  try {
    const response = await studentService.createStudent(data);
    toast.success('Student created successfully');
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to create student');
    return rejectWithValue(error.response?.data?.message);
  }
});

export const updateStudent = createAsyncThunk('student/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await studentService.updateStudent(id, data);
    toast.success('Student updated successfully');
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update student');
    return rejectWithValue(error.response?.data?.message);
  }
});

export const deleteStudent = createAsyncThunk('student/delete', async (id, { rejectWithValue }) => {
  try {
    await studentService.deleteStudent(id);
    toast.success('Student deleted successfully');
    return id;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to delete student');
    return rejectWithValue(error.response?.data?.message);
  }
});

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setCurrentStudent: (state, action) => { state.currentStudent = action.payload; },
    clearError: (state) => { state.error = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => { state.loading = true; })
      .addCase(fetchStudents.fulfilled, (state, action) => { state.loading = false; state.students = action.payload; })
      .addCase(fetchStudents.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createStudent.pending, (state) => { state.loading = true; })
      .addCase(createStudent.fulfilled, (state, action) => { state.loading = false; state.students.push(action.payload); })
      .addCase(createStudent.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateStudent.pending, (state) => { state.loading = true; })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.students.findIndex(s => s.id === action.payload.id);
        if (index !== -1) state.students[index] = action.payload;
      })
      .addCase(updateStudent.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(deleteStudent.pending, (state) => { state.loading = true; })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(s => s.id !== action.payload);
      })
      .addCase(deleteStudent.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export const { setCurrentStudent, clearError } = studentSlice.actions;
export default studentSlice.reducer;
