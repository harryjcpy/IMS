import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import resultService from '../../services/resultService';
import { toast } from 'react-toastify';

const initialState = {
  results: [],
  currentResult: null,
  loading: false,
  error: null
};

export const fetchResults = createAsyncThunk('result/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await resultService.getAllResults();
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch results');
  }
});

export const createResult = createAsyncThunk('result/create', async (data, { rejectWithValue }) => {
  try {
    const response = await resultService.createResult(data);
    toast.success('Result created successfully');
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to create result');
    return rejectWithValue(error.response?.data?.message);
  }
});

const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => { state.loading = true; })
      .addCase(fetchResults.fulfilled, (state, action) => { state.loading = false; state.results = action.payload; })
      .addCase(fetchResults.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createResult.pending, (state) => { state.loading = true; })
      .addCase(createResult.fulfilled, (state, action) => { state.loading = false; state.results.push(action.payload); })
      .addCase(createResult.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export const { clearError } = resultSlice.actions;
export default resultSlice.reducer;
