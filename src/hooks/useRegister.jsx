// redux
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../api/modules/userApiSlice";
import { useLoginMutation } from "../api/modules/authApiSlice";
import {
  SET_IS_LOGGED,
  SET_IS_AUTHOR,
  SET_USER_INFOS,
  SET_TOKEN,
  RESET,
} from "../store/slicers/authSlice";
import { SET_ERROR, RESET_ERROR } from "../store/slicers/errorSlice";

export const useRegister = () => {
  const dispatch = useDispatch();

  // redux query
  const [register, { isLoading }] = useRegisterMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const handleRegister = async (payload) => {
    const form = new FormData();
    for (const [key, val] of Object.entries(payload)) {
      if (key === "profilePicture") {
        form.append(key, val, val.name);
      } else {
        form.append(key, val);
      }
    }
    try {
      await register(form);

      const res = await login({
        email: payload.email,
        password: payload.password,
      });
      dispatch(SET_IS_LOGGED(res.success));
      dispatch(SET_IS_AUTHOR(res.user.isAuthor));
      dispatch(SET_USER_INFOS({ ...res.user }));
      dispatch(SET_TOKEN(res.accessToken));
      navigate("/");

      return res.payload;
    } catch (e) {
      dispatch(
        SET_ERROR({ status: err.data.status, message: err.data.message })
      );
      setTimeout(() => {
        dispatch(RESET_ERROR({}));
      }, 5000);
    }
  };
  return { handleRegister };
};
