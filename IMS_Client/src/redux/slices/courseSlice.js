import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import courseService from '../../services/courseService';
import { toast } from 'react-toastify';

const initialState = {
  courses: [],
  currentCourse: null,
  loading: false,
  error: null
};

export const fetchCourses = createAsyncThunk('course/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await courseService.getAllCourses();
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch courses');
  }
});

export const createCourse = createAsyncThunk('course/create', async (data, { rejectWithValue }) => {
  try {
    const response = await courseService.createCourse(data);
    toast.success('Course created successfully');
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to create course');
    return rejectWithValue(error.response?.data?.message);
  }
});

export const updateCourse = createAsyncThunk('course/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await courseService.updateCourse(id, data);
    toast.success('Course updated successfully');
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update course');
    return rejectWithValue(error.response?.data?.message);
  }
});

export const deleteCourse = createAsyncThunk('course/delete', async (id, { rejectWithValue }) => {
  try {
    await courseService.deleteCourse(id);
    toast.success('Course deleted successfully');
    return id;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to delete course');
    return rejectWithValue(error.response?.data?.message);
  }
});

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCurrentCourse: (state, action) => { state.currentCourse = action.payload; },
    clearError: (state) => { state.error = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => { state.loading = true; })
      .addCase(fetchCourses.fulfilled, (state, action) => { state.loading = false; state.courses = action.payload; })
      .addCase(fetchCourses.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createCourse.pending, (state) => { state.loading = true; })
      .addCase(createCourse.fulfilled, (state, action) => { state.loading = false; state.courses.push(action.payload); })
      .addCase(createCourse.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateCourse.pending, (state) => { state.loading = true; })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.courses.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.courses[index] = action.payload;
      })
      .addCase(updateCourse.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(deleteCourse.pending, (state) => { state.loading = true; })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = state.courses.filter(c => c.id !== action.payload);
      })
      .addCase(deleteCourse.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export const { setCurrentCourse, clearError } = courseSlice.actions;
export default courseSlice.reducer;
