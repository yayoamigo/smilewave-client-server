import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
    post: [], isLoading: true,
};

export const fetchPost = createAsyncThunk('fetchPost', async () => {
    try {
      const response = await fetch("posts/timeline/63e41b996dd452f776eab9f1");
  
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

const postSlice = createSlice({
    name: 'GET',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
    builder
        .addCase(fetchPost.pending, (state) => {
        state.isLoading = true;
        })
        .addCase(fetchPost.fulfilled, (state,  {payload} ) => {
        state.isLoading = false;
        state.post = payload
        console.log(state.post);
    })
        .addCase(fetchPost.rejected, (state) => {
        state.isLoading = false;
        });
    },
});


export default postSlice;