import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  RESET,
  SET_TOKEN,
  SET_IS_LOGGED,
  SET_IS_AUTHOR,
  SET_USER_INFOS,
} from "../store/slicers/authSlice";
import { RESET_POSTS } from "../store/slicers/postsSlice";

const LOGOUT_URL = "/auth/logout";
const REFRESH_URL = "/auth/refresh";

// ? Creare una query di base che non ha bisogno di autenticazione, nella funzione completa viene chiamata se ovviamente restituisce errore 403, ossia chiamata protetta da auth si va a fare le verifiche del caso

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
  // headers settati se la chiamata ha bisogno del token, getState permette di accedere allo store di redux per andarsi a prendere il token ad esempio
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    // if (endpoint === "register") {
    //   headers.set("Content-Type", "multipart/form-data");
    // }
    return headers;
  },
});

// ? query con reauth se necessario
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // prima chiamata
  let result = await baseQuery(args, api, extraOptions);
  // se da errore
  if (result?.error?.status === 403) {
    //refresh del token
    let refreshedToken = await baseQuery(REFRESH_URL, api, extraOptions);
    //se possibile refresharlo allora refrsh token non scaduto
    if (refreshedToken.data) {
      api.dispatch(SET_IS_LOGGED(refreshedToken.data.success));
      api.dispatch(SET_IS_AUTHOR(refreshedToken.data.user.isAuthor));
      api.dispatch(SET_USER_INFOS({ ...refreshedToken.data.user }));
      api.dispatch(SET_TOKEN(refreshedToken.data.accessToken));

      // riprovo chiamata con nuovo token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // login scaduto
      await baseQuery(LOGOUT_URL, api, extraOptions);
      api.dispatch(RESET());
      api.dispatch(RESET_POSTS());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "Post", "Tags"],
  endpoints: (builder) => ({}),
});
