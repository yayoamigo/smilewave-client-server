import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
  user: {},
  isLoading: true,
};


export const fetchUser = createAsyncThunk('fetchUser', async (id) => {
    try {
      const response = await fetch(`/users?userId=${id}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

const userSlice = createSlice({
    name: 'GET',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
          .addCase(fetchUser.pending, (state) => {
              state.isLoading = true;
          })
          .addCase(fetchUser.fulfilled, (state, { payload }) => {
              state.isLoading = false;
              state.user[payload._id] = payload; // Update user object with new data
          })
          .addCase(fetchUser.rejected, (state) => {
              state.isLoading = false;
          });
  }  
});


export default userSlice;