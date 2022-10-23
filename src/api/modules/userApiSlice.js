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
  }),
});

export const { useRegisterMutation } = userApiSlice;
