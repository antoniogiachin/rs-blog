import { Outlet } from "react-router-dom";
import { TheHeader } from "./components/UI/TheHeader";
import { useState, useEffect, useRef } from "react";
// styles
import "./App.css";
// redux
import { useDispatch, useSelector } from "react-redux";
// redux auth
import {
  authorStatus,
  userInfosBatch,
  tokenAvalable,
  loginStatus,
} from "./store/slicers/authSlice";
// redux posts
import {
  selectAllPosts,
  selectPostsStatus,
  selectPostsError,
  fetchPosts,
} from "./store/slicers/postsSlice";
// custom hooks
import { useRefreshToken } from "./hooks/useRefreshToken";

function App() {
  const dispatch = useDispatch();

  // show navbar handle
  const positionY = useRef(0);
  const [navbarVisible, setNavbarvisible] = useState(true);

  // selectors auth redux
  const isLogged = useSelector(loginStatus);
  const token = useSelector(tokenAvalable);

  // selectors posts redux
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(selectPostsStatus);
  const postsError = useSelector(selectPostsError);

  // custom hooks
  const { refresh } = useRefreshToken();

  // handle navbar
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

  // handle fetch posts
  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  useEffect(() => {
    const persistLogin = async () => {
      try {
        await refresh();
      } catch (err) {
        // console.error(err);
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
