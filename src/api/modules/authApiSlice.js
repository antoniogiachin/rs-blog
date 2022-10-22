// * Import Slice API Base
import { apiSlice } from "../apiSlice";
// * Import  dispatch da authSlice
import {
  SET_IS_LOGGED,
  SET_IS_AUTHOR,
  SET_USER_INFOS,
  SET_TOKEN,
} from "../../store/slicers/authSlice";
// * EndPoints
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
    refresh: builder.query({
      query: () => ({
        url: REFRESH_URL,
        method: "GET",
      }),
      async onQuertStarted(arg, { dispatch, queryFullfilled }) {
        try {
          const { success, accessToken, user } = await queryFullfilled;

          if (!success) {
            throw "Login fallito";
          }

          dispatch(SET_IS_LOGGED(success));
          dispatch(SET_USER_INFOS());
          dispatch(SET_IS_AUTHOR(user.isAuthor));
          dispatch(SET_TOKEN(accessToken));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: LOGOUT_URL,
        method: "POST",
      }),
      async onQuertStarted(arg, { dispatch }) {
        // metodo per resettare tutti i valori cached
        dispatch(apiSlice.util.resetApiState());
      },
    }),
  }),
});

export const { useLoginMutation, sendLogoutMutation, useRefreshQuery } =
  authApiSlice;
