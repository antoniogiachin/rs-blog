import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slicers/authSlice";
import postsReducer from "./slicers/postsSlice";

export default configureStore({
  reducer: { auth: authReducer, posts: postsReducer },
});
