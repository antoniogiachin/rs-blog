import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    ldng: false,
  },
  reducers: {
    SET_LOADING: (state, action) => {
      state.ldng = action.payload;
    },
  },
});

export const isLoadingState = (state) => state.loading.ldng;

export const { SET_LOADING } = loadingSlice.actions;

export default loadingSlice.reducer;
