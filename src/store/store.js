import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slicers/authSlice";

export default configureStore({
  reducer: { auth: authReducer },
});
