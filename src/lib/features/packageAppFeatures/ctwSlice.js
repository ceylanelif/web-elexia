import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  ctwList: [],
  loading: false,
  error: null,
};

export const fetchCtw = createAsyncThunk('ctw/fetchCtw', async () => {
  try {
    const response = await fetch('/api/ctws/getall');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.data; // Sadece veri kısmını döndürüyoruz
  } catch (error) {
    throw error;
  }
});

export const ctwSlice = createSlice({
  name: 'ctw',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCtw.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCtw.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.ctwList = action.payload;
      })
      .addCase(fetchCtw.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ctwSlice.reducer;
