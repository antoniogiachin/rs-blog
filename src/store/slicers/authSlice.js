import { createSlice } from "@reduxjs/toolkit";

// export const handleLogin = createAsyncThunk(
//   "auth/handleLogin",
//   async (payload) => {
//     try {
//       const res = await axios.post(
//         LOGIN_URL,
//         {
//           email: payload.email,
//           password: payload.password,
//         },
//         { withCredentials: true }
//       );
//       return res.data; // sara' action.payload
//     } catch (e) {
//       return e.response.data;
//     }
//   }
// );

// export const handleRefresh = createAsyncThunk(
//   "auth/handleRefresh",
//   async () => {
//     try {
//       const res = await axios.get(REFRESH_URL, {
//         withCredentials: true,
//       });
//       return res.data; // sara' action.payload
//     } catch (e) {
//       return e.response.data;
//     }
//   }
// );

// export const handleLogout = createAsyncThunk("auth/handleLogout", async () => {
//   try {
//     const res = await axios.post(LOGOUT_URL, {
//       withCredentials: true,
//     });

//     return res.data; // sara' action.payload
//   } catch (e) {
//     return e.response.data;
//   }
// });

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
