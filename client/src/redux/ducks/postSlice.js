import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  post: JSON.parse(localStorage.getItem("posts")) || [],
  isLoading: true,
};

export const fetchPost = createAsyncThunk("fetchPost", async (username) => {
  try {
    const response = await fetch(`api/posts/timeline/${username}`);

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


export const likePost = createAsyncThunk("likePost", async ({postId, userId}) => {
  try {
    const response = await axios.put(`api/posts/${postId}/like`, { userId });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});


const postSlice = createSlice({
  name: "GET",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPost.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.post = payload;
        localStorage.setItem("posts", JSON.stringify(payload)); // save the posts to localStorage
      })
      .addCase(fetchPost.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(likePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likePost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(likePost.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export default postSlice;
