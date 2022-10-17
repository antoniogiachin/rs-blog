import { Outlet } from "react-router-dom";
import { TheHeader } from "./components/UI/TheHeader";
import { useState, useEffect, useRef, useMemo } from "react";
// styles
import "./App.css";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  SET_USER_INFOS,
  SET_IS_LOGGED,
  SET_IS_AUTHOR,
} from "./store/slicers/authSlice";
import { useRefreshToken } from "./hooks/useRefreshToken";

function App() {
  // show navbar handle
  const positionY = useRef(0);
  const [navbarVisible, setNavbarvisible] = useState(true);
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const token = useSelector((state) => state.auth.token);
  const { refresh } = useRefreshToken();

  const handleScroll = () => {
    if (window.scrollY > positionY.current) {
      positionY.current = window.scrollY;
      setNavbarvisible(false);
    } else {
      positionY.current = window.scrollY;
      setNavbarvisible(true);
    }
  };

  // scrolling navbar
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const persistLogin = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      }
    };

    if (!isLogged || !token) {
      persistLogin();
    }
  }, []);

  return (
    <>
      {/* HEADER  */}
      {navbarVisible && <TheHeader />}
      {/* RENDER PAGES  */}
      <div className="ms_container mt-12 overflow-auto bg-purple-400">
        <div className="container mx-auto p-5">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
