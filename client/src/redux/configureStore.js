import { configureStore } from '@reduxjs/toolkit';
import postSlice from './ducks/postSlice';
import userSlice from './ducks/userSlice';
import postUserSlice from './ducks/userPostSlice';
import authSlice from './ducks/authSlice';

const store = configureStore({
    reducer: {
      post: postSlice.reducer,
      user: userSlice.reducer,
      postUser: postUserSlice.reducer,
      login: authSlice.reducer,
    },
  });
  
  export default store;
  