import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    postUser: JSON.parse(localStorage.getItem("postUser")) || [],
    isLoading: true,
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
  name: 'postUser',
  initialState,
  reducers: {
    setPostUser: (state, action) => {
      state.postUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.postUser = payload;
        
      })
      .addCase(fetchPostUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setPostUser } = postUserSlice.actions;
export default postUserSlice;
