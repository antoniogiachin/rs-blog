// axios
import axios from "../api/axios";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
// react
import { useState } from "react";

export const useFetcher = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  const handleFetch = async (url, mode = "public") => {
    setIsLoading(true);
    let res;

    try {
      if (mode === "public") {
        res = await axios.get(url);
      } else {
        res = await axiosPrivate.get(url);
      }
    } catch (e) {
      setIsLoading(false);
      setError(e.response.data);
    }

    setIsLoading(false);
    return res;
  };

  return { isLoading, error, handleFetch };
};
