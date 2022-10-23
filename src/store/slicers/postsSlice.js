import { createSlice } from "@reduxjs/toolkit";

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
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;

export const { SET_POST_FETCH_STATUS, SET_POSTS, RESET_POSTS } =
  postsSlice.actions;

export default postsSlice.reducer;
