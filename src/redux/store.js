import {configureStore} from '@reduxjs/toolkit';
import userReducer, {loadInitialState} from './user';
import cartReducer from './cart';

export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
