// axios
import { useAxiosPrivate } from "./useAxiosPrivate";
const UPDATE_URL = "/users";
// redux
import { useDispatch } from "react-redux";
import {
  handleLogin,
  SET_ERROR,
  SET_IS_LOADING,
} from "../store/slicers/authSlice";

export const useUserUpdate = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const handleUpdate = async (id, payload) => {
    dispatch(SET_IS_LOADING(true));
    const form = new FormData();

    for (const [key, val] of Object.entries(payload)) {
      if (key === "profilePicture") {
        form.append(key, val, val.name);
      } else {
        form.append(key, val);
      }
    }

    try {
      const res = await axiosPrivate.put(`${UPDATE_URL}/${id}`, form);
      dispatch(SET_IS_LOADING(false));
    } catch (e) {
      dispatch(SET_IS_LOADING(false));
      dispatch(SET_ERROR(e.response.data));
      return e.code;
    }
  };

  return { handleUpdate };
};
