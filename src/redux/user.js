import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isLoggedIn: false,
    location: null,
    topupToken: '',
    giftcardToken: '',
    countryCode: '',
    phoneNumber: '3204518793',
    email: '',
    operatorID: '',
    utilityToken: '',
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoginState: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setTopUpToken: (state, action) => {
      state.topupToken = action.payload;
    },
    setgiftcardToken: (state, action) => {
      state.giftcardToken = action.payload;
    },
    setUtilityToken: (state, action) => {
      state.utilityToken = action.payload;
    },
    setCountryCode: (state, action) => {
      state.countryCode = action.payload;
    },
    setOperatorID: (state, action) => {
      state.operatorID = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  setLoginState,
  setLocation,
  setTopUpToken,
  setgiftcardToken,
  setUtilityToken,
  setCountryCode,
  setOperatorID,
  setPhoneNumber,
  setEmail,
} = userSlice.actions;

export default userSlice.reducer;
