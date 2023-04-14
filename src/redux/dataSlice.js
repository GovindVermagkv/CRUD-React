import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    addData: (state, action) => {
      state.data.push({ ...action.payload, id: Date.now() });
    },
    updateData: (state, action) => {
      const index = state.data.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    removeData: (state, action) => {
      state.data = state.data.filter(d => d.id !== action.payload);
    },
    readData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { addData, updateData, removeData, readData } = dataSlice.actions;

export default dataSlice.reducer;
