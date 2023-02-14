import { configureStore } from '@reduxjs/toolkit';
import postSlice from './postSlice';
import userSlice from './userSlice';

const store = configureStore({
    reducer: {
      post: postSlice.reducer,
      user: userSlice.reducer,
    },
  });
  
  export default store;
  