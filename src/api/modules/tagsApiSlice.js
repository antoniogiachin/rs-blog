import { apiSlice } from "../apiSlice";
import { SET_TAGS } from "../../store/slicers/tagsSlice";
// ? EndPoints
const TAGS_URL = "/tags";

export const tagApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTags: builder.query({
      query: () => TAGS_URL,
      providesTags: ["Tags"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(SET_TAGS([...data.data]));
      },
    }),
  }),
});

export const { useGetAllTagsQuery } = tagApiSlice;
