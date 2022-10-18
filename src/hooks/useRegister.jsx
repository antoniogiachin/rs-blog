// axios
import axios from "../api/axios";
const REGISTER_URL = "/users";
// redux
import { useDispatch } from "react-redux";
import {
  handleLogin,
  SET_ERROR,
  SET_IS_LOADING,
} from "../store/slicers/authSlice";


export const useRegister = () => {
  const dispatch = useDispatch();

  const handleRegister = async (payload) => {
    dispatch(SET_IS_LOADING(true));
    try {
      await axios.post(REGISTER_URL, { ...payload });
      dispatch(SET_IS_LOADING(false));
      const res = await dispatch(
        handleLogin({ email: payload.email, password: payload.password })
      );

      return res.payload;
    } catch (e) {
      dispatch(SET_IS_LOADING(false));
      dispatch(SET_ERROR(e.response.data));
      return e.code;
    }
  };
  return { handleRegister };
};
