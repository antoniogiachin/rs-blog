import { createSlice } from "@reduxjs/toolkit";

const tagSlice = createSlice({
  name: "posts",
  initialState: {
    tags: null,
  },
  reducers: {
    SET_TAGS: (state, action) => {
      state.tags = action.payload;
    },
  },
});

export const selectAllTags = (state) => state.tags.tags;

export const { SET_TAGS } = tagSlice.actions;

export default tagSlice.reducer;
