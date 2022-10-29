import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authReducer from "./slicers/authSlice";
import postsReducer from "./slicers/postsSlice";
import tagsReducer from "./slicers/tagsSlice";
import errorReducer from "./slicers/errorSlice";
import loadingReducer from "./slicers/loadingSLice";

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    posts: postsReducer,
    tags: tagsReducer,
    error: errorReducer,
    loading: loadingReducer,
  },
  //serve un middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
