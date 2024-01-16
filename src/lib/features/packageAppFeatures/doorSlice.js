"use client"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDimensions = createAsyncThunk(
  'dimension/fetchDimensions',
  async (mechanismWidth) => {
    try {
      const response = await axios.get(`/api/dimensions/getByHeightAndMechanismWidth?height=2000&mechanismWidth=${mechanismWidth}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.message || 'An error occurred while fetching doors');
    }
  }
);

const doorSlice = createSlice({
  name: 'door',
  initialState: {
    dimensions: [],
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDimensions.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchDimensions.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.dimensions = action.payload;
        state.error = null; // Reset error on successful fetch
      })
      .addCase(fetchDimensions.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload || 'Failed to fetch dimensions';
      });
  },
});

export default doorSlice.reducer;

export const selectDoorDimensions = (state) => state.door.dimensions;
export const selectDoorLoading = (state) => state.door.loading;
export const selectDoorError = (state) => state.door.error;
