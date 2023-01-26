import {configureStore} from '@reduxjs/toolkit';
import userReducer, {loadInitialState} from './user';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
