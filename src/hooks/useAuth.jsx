// * Import Supabase
import { supabase } from "../supabase/supabaseClient";
// * React Imports
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

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
      let { user, error } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
      });

      if (error) {
        setIsLoading(false);
        throw error;
      }

      setUser((prevState) => {
        return { ...prevState, ...user };
      });

      const { data, error: userError } = await supabase.from("users").insert([
        {
          name: payload.name,
          surname: payload.surname,
          username: payload.username,
          birthDate: payload.birthDate,
          isAuthor: payload.isAuthor,
          aka: payload.aka,
        },
      ]);

      if (userError) {
        setIsLoading(false);
        throw userError;
      }

      setUserData((prevState) => {
        return { ...prevState, ...data };
      });

      setIsLoading(false);
    } catch (e) {
      setErrors(e.message);
      console.log(e);
    }
  };

  return { handleRegister, isLoading, user, userData, errors };
};
