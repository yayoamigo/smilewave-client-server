import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  friends: JSON.parse(localStorage.getItem("friends")) || [],
  isLoading: true,
};
export const fetchFriends = createAsyncThunk("fetchFriends", async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/friends/${userId}`);
  
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });


const friendsSlice = createSlice({
  name: "GET",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFriends.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.friends = payload
        localStorage.setItem("friends", JSON.stringify(state.friends)); // save the sorted Friendss to localStorage
      })
      .addCase(fetchFriends.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default friendsSlice;
