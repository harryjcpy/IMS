import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import accountantService from '../../services/accountantService';
import { toast } from 'react-toastify';

const initialState = {
  accountants: [],
  currentAccountant: null,
  loading: false,
  error: null
};

export const fetchAccountants = createAsyncThunk('accountant/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await accountantService.getAllAccountants();
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch accountants');
  }
});

export const createAccountant = createAsyncThunk('accountant/create', async (data, { rejectWithValue }) => {
  try {
    const response = await accountantService.createAccountant(data);
    toast.success('Accountant created successfully');
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to create accountant');
    return rejectWithValue(error.response?.data?.message);
  }
});

export const updateAccountant = createAsyncThunk('accountant/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await accountantService.updateAccountant(id, data);
    toast.success('Accountant updated successfully');
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update accountant');
    return rejectWithValue(error.response?.data?.message);
  }
});

export const deleteAccountant = createAsyncThunk('accountant/delete', async (id, { rejectWithValue }) => {
  try {
    await accountantService.deleteAccountant(id);
    toast.success('Accountant deleted successfully');
    return id;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to delete accountant');
    return rejectWithValue(error.response?.data?.message);
  }
});

const accountantSlice = createSlice({
  name: 'accountant',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountants.pending, (state) => { state.loading = true; })
      .addCase(fetchAccountants.fulfilled, (state, action) => { state.loading = false; state.accountants = action.payload; })
      .addCase(fetchAccountants.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createAccountant.pending, (state) => { state.loading = true; })
      .addCase(createAccountant.fulfilled, (state, action) => { state.loading = false; state.accountants.push(action.payload); })
      .addCase(createAccountant.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateAccountant.pending, (state) => { state.loading = true; })
      .addCase(updateAccountant.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.accountants.findIndex(a => a.id === action.payload.id);
        if (index !== -1) state.accountants[index] = action.payload;
      })
      .addCase(updateAccountant.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(deleteAccountant.pending, (state) => { state.loading = true; })
      .addCase(deleteAccountant.fulfilled, (state, action) => {
        state.loading = false;
        state.accountants = state.accountants.filter(a => a.id !== action.payload);
      })
      .addCase(deleteAccountant.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export const { clearError } = accountantSlice.actions;
export default accountantSlice.reducer;
