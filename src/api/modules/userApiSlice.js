import { apiSlice } from "../apiSlice";

// ? EndPoints
const REGISTER_URL = "/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (payload) => ({
        url: REGISTER_URL,
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": undefined,
        },
      }),
    }),
    updateUser: builder.mutation({
      query: (payload) => ({
        url: `${REGISTER_URL}/${payload?.id}`,
        method: "PUT",
        body: payload.body,
        headers: {
          "Content-Type": undefined,
        },
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useRegisterMutation, useUpdateUserMutation } = userApiSlice;
