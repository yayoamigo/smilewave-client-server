import { configureStore } from '@reduxjs/toolkit';
import postSlice from './ducks/postSlice';
import usersSlice from './ducks/userSlice';
import postUserSlice from './ducks/userPostSlice';
import authSlice from './ducks/authSlice';
import friendsSlice from './ducks/friendsSlice';

const store = configureStore({
    reducer: {
      post: postSlice.reducer,
      users: usersSlice.reducer,
      postUser: postUserSlice.reducer,
      login: authSlice.reducer,
      friends: friendsSlice.reducer,
    },
  });
  
  export default store;
  