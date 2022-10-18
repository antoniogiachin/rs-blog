import { Outlet } from "react-router-dom";
import { TheHeader } from "./components/UI/TheHeader";
import { useState, useEffect, useRef } from "react";
// styles
import "./App.css";
// redux
import { useDispatch, useSelector } from "react-redux";
// redux auth
import {
  SET_USER_POSTS,
  tokenAvalable,
  loginStatus,
  authorStatus,
  userInfosBatch,
  handleRefresh,
} from "./store/slicers/authSlice";
// redux posts
import {
  selectAllPosts,
  selectPostsStatus,
  selectPostsError,
  fetchPosts,
} from "./store/slicers/postsSlice";
// custom hooks
import { useAxiosPrivate } from "./hooks/useAxiosPrivate";

function App() {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  // show navbar handle
  const positionY = useRef(0);
  const [navbarVisible, setNavbarvisible] = useState(true);

  // selectors auth redux
  const isLogged = useSelector(loginStatus);
  const isAuthor = useSelector(authorStatus);
  const token = useSelector(tokenAvalable);
  const userInfos = useSelector(userInfosBatch);

  // selectors posts redux
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(selectPostsStatus);
  const postsError = useSelector(selectPostsError);

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
        dispatch(handleRefresh());
      } catch (err) {
        // console.error(err);
      }
    };

    if (!isLogged || !token) {
      persistLogin();
    }
  }, []);

  useEffect(() => {
    if (userInfos && isAuthor) {
      // fetch users posts
      const handleFetchUserPosts = async () => {
        const userPosts = await axiosPrivate.get(
          `/posts/user/${userInfos.email}`
        );
        dispatch(SET_USER_POSTS([...userPosts.data.data]));
      };

      handleFetchUserPosts();
    }
  }, [isAuthor, userInfos]);

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
