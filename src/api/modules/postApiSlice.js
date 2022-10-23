// Redux
import { apiSlice } from "../apiSlice";
import {
  SET_POST_FETCH_STATUS,
  SET_POSTS,
} from "../../store/slicers/postsSlice";
import { SET_USER_POSTS } from "../../store/slicers/authSlice";
// Url
const ALL_POSTS_URL = "/posts";
const ALL_USER_POSTS = "/posts/user";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ALL_POSTS_URL,
      providesTags: ["Post"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        dispatch(SET_POST_FETCH_STATUS("loading"));

        try {
          const { data } = await queryFulfilled;
          dispatch(SET_POSTS([...data.data]));
          dispatch(SET_POST_FETCH_STATUS("succeeded"));
        } catch (err) {
          dispatch(SET_POST_FETCH_STATUS("failed"));
        }
      },
    }),
    getAllUserPosts: builder.query({
      query: (userEmail) => `${ALL_USER_POSTS}/${userEmail}`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(SET_USER_POSTS([...data.data]));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useGetAllPostsQuery, useLazyGetAllUserPostsQuery } =
  postApiSlice;
