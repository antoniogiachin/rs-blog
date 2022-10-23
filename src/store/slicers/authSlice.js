import { createSlice } from "@reduxjs/toolkit";

const resetState = {
  isLogged: false,
  isAuthor: false,
  userInfos: {},
  token: null,
  userPosts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: false,
    isAuthor: false,
    userInfos: {},
    token: null,
    userPosts: [],
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
    SET_USER_POSTS: (state, action) => {
      state.userPosts = [...action.payload];
    },
    RESET: (state, action) => {
      for (const key of Object.keys(resetState)) {
        state[key] = resetState[key];
      }
    },
  },
});

export const loginStatus = (state) => state.auth.isLogged;
export const authorStatus = (state) => state.auth.isAuthor;
export const userInfosBatch = (state) => state.auth.userInfos;
export const userPostsBatch = (state) => state.auth.userPosts;
export const tokenAvalable = (state) => state.auth.token;

export const {
  SET_IS_LOGGED,
  SET_IS_AUTHOR,
  SET_USER_INFOS,
  SET_TOKEN,
  SET_USER_POSTS,
  RESET,
} = authSlice.actions;

export default authSlice.reducer;
