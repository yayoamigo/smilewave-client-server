import { configureStore } from '@reduxjs/toolkit';
import postSlice from './postSlice';

const store = configureStore({
    reducer: {
      post: postSlice.reducer,
    },
  });
  
  export default store;
  