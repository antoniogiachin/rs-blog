// * Axios
import axios from "../api/axios";
// * Redux
import { useDispatch, useSelector } from "react-redux";
import { SET_IS_LOGGED, SET_TOKEN } from "../store/slicers/authSlice";

export const useRefreshToken = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();

  const refresh = async () => {
    const res = await axios.get("/auth/refresh", {
      withCredentials: true,
    });

    dispatch(SET_IS_LOGGED(res.data.success));
    dispatch(SET_TOKEN(res.data.accessToken));

    return res.data.accessToken;
  };

  return { refresh };
};
