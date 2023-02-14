import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
    postUser: [], isLoading: true,
};

export const fetchPostUser = createAsyncThunk('fetchPostUser', async (username) => {
    try {
      const response = await fetch(`/posts/profile/${username}`);
  
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

const postUserSlice = createSlice({
    name: 'GET',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
    builder
        .addCase(fetchPostUser.pending, (state) => {
        state.isLoading = true;
        })
        .addCase(fetchPostUser.fulfilled, (state,  {payload} ) => {
        state.isLoading = false;
        state.postUser = payload
    })
        .addCase(fetchPostUser.rejected, (state) => {
        state.isLoading = false;
        });
    },
});


export default postUserSlice;