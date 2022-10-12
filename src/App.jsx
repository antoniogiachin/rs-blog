import { Outlet } from "react-router-dom";
import { TheHeader } from "./components/UI/TheHeader";
import { useState, useEffect, useRef, useMemo } from "react";
// styles
import "./App.css";
// redux
import { useDispatch } from "react-redux";
import {
  SET_USER_INFOS,
  SET_IS_LOGGED,
  SET_IS_AUTHOR,
} from "./store/slicers/authSlice";

function App() {
  // show navbar handle
  const positionY = useRef(0);
  const [navbarVisible, setNavbarvisible] = useState(true);
  const dispatch = useDispatch();

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

  // set redux auth
  const retrieveAuthState = useMemo(
    () => JSON.parse(localStorage.getItem("auth")),
    [localStorage.getItem("auth")]
  );

  useEffect(() => {
    if (retrieveAuthState && retrieveAuthState.valid) {
      dispatch(SET_IS_LOGGED(true));
      dispatch(SET_IS_AUTHOR(retrieveAuthState.isAuthor));
      dispatch(SET_USER_INFOS({ ...retrieveAuthState }));
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
