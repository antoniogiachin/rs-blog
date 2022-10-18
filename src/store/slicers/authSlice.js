import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// axios
import axios from "../../api/axios";
const LOGIN_URL = "/auth";
const REFRESH_URL = "/auth/refresh";
const LOGOUT_URL = "/auth/logout";

export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async (payload) => {
    try {
      const res = await axios.post(
        LOGIN_URL,
        {
          email: payload.email,
          password: payload.password,
        },
        { withCredentials: true }
      );
      return res.data; // sara' action.payload
    } catch (e) {
      return e.response.data;
    }
  }
);

export const handleRefresh = createAsyncThunk(
  "auth/handleRefresh",
  async () => {
    try {
      const res = await axios.get(REFRESH_URL, {
        withCredentials: true,
      });
      return res.data; // sara' action.payload
    } catch (e) {
      return e.response.data;
    }
  }
);

export const handleLogout = createAsyncThunk("auth/handleLogout", async () => {
  try {
    const res = await axios.post(LOGOUT_URL, {
      withCredentials: true,
    });

    return res.data; // sara' action.payload
  } catch (e) {
    return e.response.data;
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: false,
    isAuthor: false,
    userInfos: {},
    token: null,
    isLoading: false, // => idle || loading || succeeded || failed
    error: null,
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
    SET_ERROR: (state, action) => {
      state.error = action.payload;
    },
    SET_IS_LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    SET_USER_POSTS: (state, action) => {
      state.userPosts = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        if (!action.payload.success) {
          state.isLoading = false;
          state.error = action.payload.message;
        } else {
          state.isLoading = false;
          state.isLogged = action.payload.success;
          state.isAuthor = action.payload.user.isAuthor;
          state.userInfos = { ...state.userInfos, ...action.payload.user };
          state.token = action.payload.accessToken;
        }
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(handleRefresh.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(handleRefresh.fulfilled, (state, action) => {
        if (!action.payload.success) {
          state.isLoading = false;
          // state.error = action.payload;
        } else {
          state.isLoading = false;
          state.isLogged = action.payload.success;
          state.isAuthor = action.payload.user.isAuthor;
          state.userInfos = { ...state.userInfos, ...action.payload.user };
          state.token = action.payload.accessToken;
        }
      })
      .addCase(handleRefresh.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(handleLogout.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(handleLogout.fulfilled, (state, action) => {
        if (!action.payload.success) {
          state.isLoading = false;
          state.error = action.payload;
        } else {
          state.isLoading = false;
          state.isLogged = false;
          state.isAuthor = false;
          state.userInfos = {};
          state.token = null;
        }
      })
      .addCase(handleLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const loginStatus = (state) => state.auth.isLogged;
export const authorStatus = (state) => state.auth.isAuthor;
export const userInfosBatch = (state) => state.auth.userInfos;
export const userPostsBatch = (state) => state.auth.userPosts;
export const authErrorBatch = (state) => state.auth.error;
export const authStatus = (state) => state.auth.isLoading;
export const tokenAvalable = (state) => state.auth.token;

export const {
  SET_IS_LOGGED,
  SET_IS_AUTHOR,
  SET_USER_INFOS,
  SET_TOKEN,
  SET_ERROR,
  SET_IS_LOADING,
  SET_USER_POSTS,
} = authSlice.actions;

export default authSlice.reducer;
