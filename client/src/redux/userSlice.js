import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  theme: "light",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
    },
    themeChange: (state, action) => {
      state.theme = action.payload;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  signInSuccess,
  signInFailure,
  signOut,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
  themeChange,
} = userSlice.actions;

export default userSlice.reducer;
