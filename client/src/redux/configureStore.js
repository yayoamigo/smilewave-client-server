import { configureStore } from '@reduxjs/toolkit';
import postSlice from './postSlice';
import userSlice from './userSlice';
import postUserSlice from './userPostSlice';

const store = configureStore({
    reducer: {
      post: postSlice.reducer,
      user: userSlice.reducer,
      postUser: postUserSlice.reducer,
    },
  });
  
  export default store;
  