// * Import Custom components
import { TheLoader } from "./components/UI/TheLoader";
import { Outlet } from "react-router-dom";
import { TheHeader } from "./components/UI/TheHeader";
import { useState, useEffect, useRef } from "react";
// styles
import "./App.css";
// router
import { useNavigate } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
// redux auth
import {
  SET_IS_LOGGED,
  SET_IS_AUTHOR,
  SET_USER_INFOS,
  SET_TOKEN,
  tokenAvalable,
  loginStatus,
  authorStatus,
  userInfosBatch,
  RESET,
  // handleRefresh,
} from "./store/slicers/authSlice";
import {
  useRefreshMutation,
  useLogoutMutation,
} from "./api/modules/authApiSlice";
// redux posts
import {
  // selectAllPosts,
  selectPostsStatus,
  // selectPostsError,
  // fetchPosts,
} from "./store/slicers/postsSlice";
import {
  useGetAllPostsQuery,
  useLazyGetAllUserPostsQuery,
} from "./api/modules/postApiSlice";
import { isLoadingState } from "./store/slicers/loadingSlice";
import { useGetAllTagsQuery } from "./api/modules/tagsApiSlice";

function App() {
  const dispatch = useDispatch();

  // router
  const navigate = useNavigate();

  // show navbar handle
  const positionY = useRef(0);
  const [navbarVisible, setNavbarvisible] = useState(true);

  // selectors auth redux
  const isLogged = useSelector(loginStatus);
  const isAuthor = useSelector(authorStatus);
  const token = useSelector(tokenAvalable);
  const userInfos = useSelector(userInfosBatch);

  // selectors posts redux
  const postsStatus = useSelector(selectPostsStatus);
  const { isLoading: isLoadingPosts, error } = useGetAllPostsQuery(); // se voglio il trigger devo usare il getLazyhook
  const [getAllUserPosts, { isLoading: isLoadingUserPosts }] =
    useLazyGetAllUserPostsQuery();

  // tags redux hanlder
  const { isLoading: isLoadingTags } = useGetAllTagsQuery();

  // selector loading state redux
  const isLoadingRedux = useSelector(isLoadingState);

  // auth redux query
  const [refresh, { isLoading }] = useRefreshMutation();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

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

  useEffect(() => {
    const persistLogin = async () => {
      try {
        const res = await refresh().unwrap();
        dispatch(SET_IS_LOGGED(res.success));
        dispatch(SET_IS_AUTHOR(res.user.isAuthor));
        dispatch(SET_USER_INFOS({ ...res.user }));
        dispatch(SET_TOKEN(res.accessToken));
      } catch (err) {
        if (err.status === 401) {
          await logout();
          dispatch(RESET());
          navigate("/login");
        }
        // console.error(err);
        // dispatch(
        //   SET_ERROR({ status: err.data.status, message: err.data.message })
        // );
        // setTimeout(() => {
        //   dispatch(RESET_ERROR({}));
        // }, 5000);
      }
    };

    if (!isLogged || !token) {
      persistLogin();
    }
  }, []);

  useEffect(() => {
    const handleFetchUserPosts = async (email) => {
      await getAllUserPosts(email);
    };
    if (userInfos && isAuthor) {
      handleFetchUserPosts(userInfos.email);
    }
  }, [isAuthor, userInfos]);

  let content;
  if (
    isLoading ||
    isLoadingPosts ||
    isLoadingTags ||
    isLogoutLoading ||
    isLoadingRedux
  ) {
    content = <TheLoader />;
  } else {
    content = (
      <div className="ms_container mt-12 overflow-auto bg-purple-300">
        <div className="container mx-auto p-5">
          <Outlet />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* HEADER  */}
      {navbarVisible && !isLoading && !isLoadingPosts && <TheHeader />}
      {content}
    </>
  );
}

export default App;
