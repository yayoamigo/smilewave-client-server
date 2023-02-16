import { configureStore } from '@reduxjs/toolkit';
import postSlice from './postSlice';
import userSlice from './userSlice';
import postUserSlice from './userPostSlice';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
      post: postSlice.reducer,
      user: userSlice.reducer,
      postUser: postUserSlice.reducer,
      login: authSlice.reducer,
    },
  });
  
  export default store;
  