import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: false,
    isAuthor: false,
    userInfos: {},
    token: null,
  },
  reducers: {
    SET_IS_LOGGED: (state, action) => {
      state.isLogged = action.payload;
    },
    SET_IS_AUTHOR: (state, action) => {
      state.isAuthor = action.payload;
    },
    SET_USER_INFOS: (state, action) => {
      state.userInfos = { ...action.payload };
    },
    SET_TOKEN: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { SET_IS_LOGGED, SET_IS_AUTHOR, SET_USER_INFOS, SET_TOKEN } =
  authSlice.actions;

export default authSlice.reducer;
