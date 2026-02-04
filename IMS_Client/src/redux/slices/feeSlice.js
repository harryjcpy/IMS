import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import feeService from '../../services/feeService';
import { toast } from 'react-toastify';

const initialState = {
  fees: [],
  loading: false,
  error: null
};

// Async thunks
export const fetchFees = createAsyncThunk(
  'fee/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await feeService.getAllFees();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch fees');
    }
  }
);

export const createFee = createAsyncThunk(
  'fee/create',
  async (feeData, { rejectWithValue }) => {
    try {
      const response = await feeService.createFee(feeData);
      toast.success('Fee created successfully');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create fee');
      return rejectWithValue(error.response?.data?.message || 'Failed to create fee');
    }
  }
);

export const updateFee = createAsyncThunk(
  'fee/update',
  async ({ id, feeData }, { rejectWithValue }) => {
    try {
      const response = await feeService.updateFee(id, feeData);
      toast.success('Fee updated successfully');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update fee');
      return rejectWithValue(error.response?.data?.message || 'Failed to update fee');
    }
  }
);

export const recordPayment = createAsyncThunk(
  'fee/recordPayment',
  async ({ id, paymentDate }, { rejectWithValue }) => {
    try {
      const response = await feeService.recordPayment(id, paymentDate);
      toast.success('Payment recorded successfully');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to record payment');
      return rejectWithValue(error.response?.data?.message || 'Failed to record payment');
    }
  }
);

export const deleteFee = createAsyncThunk(
  'fee/delete',
  async (id, { rejectWithValue }) => {
    try {
      await feeService.deleteFee(id);
      toast.success('Fee deleted successfully');
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete fee');
      return rejectWithValue(error.response?.data?.message || 'Failed to delete fee');
    }
  }
);

const feeSlice = createSlice({
  name: 'fee',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch fees
      .addCase(fetchFees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFees.fulfilled, (state, action) => {
        state.loading = false;
        state.fees = action.payload;
      })
      .addCase(fetchFees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create fee
      .addCase(createFee.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFee.fulfilled, (state, action) => {
        state.loading = false;
        state.fees.push(action.payload);
      })
      .addCase(createFee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update fee
      .addCase(updateFee.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFee.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.fees.findIndex(f => f.id === action.payload.id);
        if (index !== -1) {
          state.fees[index] = action.payload;
        }
      })
      .addCase(updateFee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Record payment
      .addCase(recordPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(recordPayment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.fees.findIndex(f => f.id === action.payload.id);
        if (index !== -1) {
          state.fees[index] = action.payload;
        }
      })
      .addCase(recordPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete fee
      .addCase(deleteFee.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFee.fulfilled, (state, action) => {
        state.loading = false;
        state.fees = state.fees.filter(f => f.id !== action.payload);
      })
      .addCase(deleteFee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = feeSlice.actions;
export default feeSlice.reducer;
