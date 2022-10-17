import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // altrimenti non salva cookie
});

// istanza privata
export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});
