import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// chiamata async per fetch all posts
import axios from "../../api/axios";
const POST_URL = "/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const res = await axios.get(POST_URL);
    return res.data; // sara' action.payload
  } catch (e) {
    return e.message;
  }
});

const resetState = {
  posts: [],
  status: "idle",
};

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle", // => idle || loading || succeeded || failed
  },
  reducers: {
    SET_POST_FETCH_STATUS: (state, action) => {
      state.status = action.payload;
    },
    SET_POSTS: (state, action) => {
      state.posts = action.payload;
    },
    RESET_POSTS: (state, action) => {
      for (const key of Object.keys(resetState)) {
        state[key] = resetState[key];
      }
    },
  },
  // handling delle chiamate thunk (usa un oggetto builder, gestisce tre casi pending, fullfilled, error)
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        if (typeof action.payload === "string") {
          state.status = "failed";
          state.error = action.payload;
        } else {
          state.status = "succeeded";
          state.posts = [...state.posts, ...action.payload.data];
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;

export const { SET_POST_FETCH_STATUS, SET_POSTS, RESET_POSTS } =
  postsSlice.actions;

export default postsSlice.reducer;
