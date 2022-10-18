// interceptors
import { axiosPrivate } from "../api/axios";
// import { useRefreshToken } from "./useRefreshToken";
import { useEffect } from "react";
// * Redux
import { useSelector, useDispatch } from "react-redux";
import {
  authStatus,
  tokenAvalable,
  handleRefresh,
} from "../store/slicers/authSlice";

export const useAxiosPrivate = () => {
  const dispatch = useDispatch();
  const auth = useSelector(authStatus);
  const token = useSelector(tokenAvalable);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          dispatch(handleRefresh());
          prevRequest.headers["Authorization"] = `Bearer ${token}`;
          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(responseIntercept);
      axiosPrivate.interceptors.response.eject(requestIntercept);
    };
  }, [auth, handleRefresh]);

  return { axiosPrivate };
};
