import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import examService from '../../services/examService';
import { toast } from 'react-toastify';

const initialState = {
  exams: [],
  currentExam: null,
  loading: false,
  error: null
};

export const fetchExams = createAsyncThunk('exam/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await examService.getAllExams();
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch exams');
  }
});

export const createExam = createAsyncThunk('exam/create', async (data, { rejectWithValue }) => {
  try {
    const response = await examService.createExam(data);
    toast.success('Exam created successfully');
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to create exam');
    return rejectWithValue(error.response?.data?.message);
  }
});

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExams.pending, (state) => { state.loading = true; })
      .addCase(fetchExams.fulfilled, (state, action) => { state.loading = false; state.exams = action.payload; })
      .addCase(fetchExams.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createExam.pending, (state) => { state.loading = true; })
      .addCase(createExam.fulfilled, (state, action) => { state.loading = false; state.exams.push(action.payload); })
      .addCase(createExam.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export const { clearError } = examSlice.actions;
export default examSlice.reducer;
