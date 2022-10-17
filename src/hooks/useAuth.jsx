// * Import Supabase
import { supabase } from "../supabase/supabaseClient";
// * Import axios
import axios from "../api/axios";
const LOGIN_URL = "/auth";
const LOGOUT_URL = "/auth/logout";
// * React Imports
import { useState, useEffect } from "react";
// * Redux Imports
import { useDispatch } from "react-redux";
import {
  SET_IS_LOGGED,
  SET_IS_AUTHOR,
  SET_USER_INFOS,
  SET_TOKEN,
} from "../store/slicers/authSlice";
// * Router Imports
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (errors) {
      setTimeout(() => {
        setErrors(null);
      }, 2000);
    }
  }, [errors]);

  const handleRegister = async (payload) => {
    setIsLoading(true);
    try {
      let res = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
      });

      if (res.error) {
        setIsLoading(false);
        throw res.error;
      }

      let userPayload = {
        name: payload.name,
        surname: payload.surname,
        username: payload.username,
        email: payload.email,
        birthDate: payload.birthDate,
        isAuthor: payload.isAuthor,
        aka: payload.aka,
        slug: `${payload.username}-${new Date().toISOString()}`,
      };

      const insertRes = await supabase.from("users").insert([userPayload]);

      if (insertRes.error) {
        setIsLoading(false);
        throw insertRes.error;
      }

      const authData = {
        email: res.data.user.email === payload.email ? payload.email : null,
        isAuthenticated: res.data.user.aud,
        idAuth: res.data.user.id,
        accessToken: res.data.session.access_token,
        refreshToken: res.data.session.refresh_token,
      };

      let dataToStore = { ...authData, valid: false };
      if (res.data.user.aud === "authenticated") {
        dataToStore = { ...authData, ...userPayload, valid: true };
      }

      localStorage.setItem("auth", JSON.stringify(dataToStore));
      if (dataToStore.valid) {
        dispatch(SET_IS_LOGGED(dataToStore));
        dispatch(SET_IS_AUTHOR(payload.isAuthor));
      }
      dispatch(SET_USER_INFOS({ ...dataToStore }));
      navigate("/");

      setIsLoading(false);
    } catch (e) {
      setErrors(e.message);
      console.log(e);
    }
  };

  const handleLogin = async (payload) => {
    try {
      setIsLoading(true);
      let res = await axios.post(
        LOGIN_URL,
        {
          email: payload.email,
          password: payload.password,
        },
        { withCredentials: true }
      );

      dispatch(SET_TOKEN(res.data.accessToken));
      dispatch(SET_USER_INFOS({ ...res.data.user }));
      dispatch(SET_TOKEN(res.data.user.isAuthor));
      dispatch(SET_IS_LOGGED(res.data.success));
      navigate("/");

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      if (!e.response) {
        setErrors("Check your internet connection!");
      } else {
        setErrors(e.response.data.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(LOGOUT_URL, {
        withCredentials: true,
      });

      console.log(res);
      
      dispatch(SET_IS_LOGGED(false));
      dispatch(SET_IS_AUTHOR(false));
      dispatch(SET_USER_INFOS({}));
      dispatch(SET_TOKEN(null));
      navigate("/");

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      if (!e.response) {
        setErrors("Check your internet connection!");
      } else {
        setErrors(e.response.data.message);
      }
    }
  };

  return {
    handleRegister,
    handleLogin,
    handleLogout,
    isLoading,
    errors,
    setErrors,
  };
};
