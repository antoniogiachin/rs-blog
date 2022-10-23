// ? Import Slice API Base
import { apiSlice } from "../apiSlice";


// ? EndPoints
const LOGIN_URL = "/auth";
const REFRESH_URL = "/auth/refresh";
const LOGOUT_URL = "/auth/logout";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: LOGIN_URL,
        method: "POST",
        body: { ...payload },
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: REFRESH_URL,
        method: "GET",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: LOGOUT_URL,
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch }) {
        // metodo per resettare tutti i valori cached
        dispatch(apiSlice.util.resetApiState());
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshMutation } =
  authApiSlice;
