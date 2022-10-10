import {  Outlet } from "react-router-dom";
import { TheHeader } from "./components/UI/TheHeader";
import { useState, useEffect, useRef } from "react";
// styles
import "./App.css";

function App() {
  // show navbar handle
  const positionY = useRef(0);
  const [navbarVisible, setNavbarvisible] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > positionY.current) {
      positionY.current = window.scrollY;
      setNavbarvisible(false);
    } else {
      positionY.current = window.scrollY;
      setNavbarvisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
