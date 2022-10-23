import { createSlice } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
  name: "error",
  initialState: {
    status: null,
    message: "",
  },
  reducers: {
    SET_ERROR: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    RESET_ERROR: (state, action) => {
      state.status = null;
      state.message = "";
    },
  },
});

export const errorStatus = (state) => state.error.status;
export const errorMessage = (state) => state.error.message;

export const { SET_ERROR, RESET_ERROR } = errorSlice.actions;

export default errorSlice.reducer;
