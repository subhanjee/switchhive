import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

//const localStoarage = JSON.parse(AsyncStorage.getItem('state'));
const stateCartItems = [];
const stateTotalPrice = 0;
const stateTotalItems = 0;
const stateWishlist = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: stateCartItems,
    totalPrice: stateTotalPrice,
    totalItems: stateTotalItems,
    wishlist: stateWishlist,
  },
  reducers: {
    addCart(state, action) {
      if (action.payload.type === 'topup') {
        action.payload['qty'] = 1;
        state.cartItems.push(action.payload);
      }
      if (
        state.cartItems.findIndex(
          item =>
            item.id === action.payload.id &&
            item.phone === action.payload.phone &&
            item.amount === action.payload.amount &&
            item.type !== 'topup',
        ) !== -1
      ) {
        const index = state.cartItems.findIndex(
          item =>
            item.id === action.payload.id &&
            item.phone === action.payload.phone &&
            item.amount === action.payload.amount,
        );
        state.cartItems[index].qty++;
        state.cartItems[index].totalAmount += action.payload.amount;
      } else if (action.payload.type !== 'topup') {
        action.payload['qty'] = 1;
        state.cartItems.push(action.payload);
      }

      state.totalPrice = Number(
        (state.totalPrice + action.payload.amount).toFixed(2),
      );
      // Number(state.totalPrice).toFixed(2);

      state.totalItems = state.totalItems + 1;
    },
    addItem(state, action) {
      if (action.payload.type === 'topup') {
        action.payload['qty'] = 1;
        state.cartItems.push(action.payload);
      }
      if (
        state.cartItems.findIndex(
          item =>
            item.id === action.payload.id &&
            item.phone === action.payload.phone &&
            item.amount === action.payload.amount &&
            item.type !== 'topup',
        ) !== -1
      ) {
        const index = state.cartItems.findIndex(
          item =>
            item.id === action.payload.id &&
            item.phone === action.payload.phone &&
            item.amount === action.payload.amount,
        );
        state.cartItems[index].qty++;
        state.cartItems[index].totalAmount += action.payload.amount;
      } else if (action.payload.type !== 'topup') {
        action.payload['qty'] = 1;
        state.cartItems.push(action.payload);
      }

      state.totalPrice = Number(
        (state.totalPrice + action.payload.amount).toFixed(2),
      );
      // Number(state.totalPrice).toFixed(2);

      state.totalItems = state.totalItems + 1;
      try {
        AsyncStorage.setItem('state', JSON.stringify(state));
      } catch (err) {
        console.log(err);
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        item =>
          item.id === action.payload.id &&
          item.phone === action.payload.phone &&
          item.amount === action.payload.amount,
      );
      item.qty++;
      item.totalAmount = Number(
        (item.totalAmount + action.payload.amount).toFixed(2),
      );
      state.totalItems = state.totalItems + 1;
      state.totalPrice = Number(
        (state.totalPrice + action.payload.amount).toFixed(2),
      );
      try {
        AsyncStorage.setItem('state', JSON.stringify(state));
      } catch (err) {
        console.log(err);
      }
    },
    removeItem(state, action) {
      if (action.payload.qty === 1) {
        const index = state.cartItems.findIndex(
          item =>
            item.id === action.payload.id &&
            item.phone === action.payload.phone &&
            item.amount === action.payload.amount,
        );
        state.cartItems.splice(index, 1);
      } else {
        const item = state.cartItems.find(
          item =>
            item.id === action.payload.id &&
            item.phone === action.payload.phone &&
            item.amount === action.payload.amount,
        );
        item.qty--;
        item.totalAmount = Number(
          (item.totalAmount - action.payload.amount).toFixed(2),
        );
      }
      state.totalItems = state.totalItems - 1;
      state.totalPrice = Number(
        (state.totalPrice - action.payload.amount).toFixed(2),
      );
      try {
        AsyncStorage.setItem('state', JSON.stringify(state));
      } catch (err) {
        console.log(err);
      }
    },
    deleteItem(state, action) {
      const index = state.cartItems.findIndex(
        item =>
          item.id === action.payload.id &&
          item.phone === action.payload.phone &&
          item.amount === action.payload.amount,
      );
      state.cartItems.splice(index, 1);
      state.totalItems = state.totalItems - action.payload.qty;
      state.totalPrice = Number(
        (state.totalPrice - action.payload.totalAmount).toFixed(2),
      );
      try {
        AsyncStorage.setItem('state', JSON.stringify(state));
      } catch (err) {
        console.log(err);
      }
    },
    clearCart(state, action) {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalItems = 0;
      try {
        AsyncStorage.setItem('state', JSON.stringify(state));
      } catch (err) {
        console.log(err);
      }
    },
    clearWishlist(state, action) {
      state.wishlist = [];
      try {
        AsyncStorage.setItem('state', JSON.stringify(state));
      } catch (err) {
        console.log(err);
      }
    },
    cartReset(state, action) {
      const {cartItems, totalItems, totalPrice} = JSON.parse(
        AsyncStorage.getItem('state'),
      );
      state.cartItems = cartItems;
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    },
    addWishlist(state, action) {
      state.wishlist.push(action.payload);
      try {
        AsyncStorage.setItem('state', JSON.stringify(state));
      } catch (err) {
        console.log(err);
      }
    },
    deleteWishlist(state, action) {
      state.wishlist = state.wishlist.filter(item => item !== action.payload);
      try {
        AsyncStorage.setItem('state', JSON.stringify(state));
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export const {
  addCart,
  addItem,
  removeItem,
  clearCart,
  deleteItem,
  incrementQuantity,
  cartReset,
  addWishlist,
  deleteWishlist,
  clearWishlist,
} = cartSlice.actions;
export default cartSlice.reducer;
