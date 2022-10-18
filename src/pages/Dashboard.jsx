// * Import React
import { useState, useMemo } from "react";
// * Import Components
import { DashboardActions } from "../components/Dashoboard/DashboardActions";
import { DashboardDisplay } from "../components/Dashoboard/DashboardDisplay";
// * Import FontAwasome
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// * Import custom Hooks
import { useFetcher } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
import { selectAllPosts } from "../store/slicers/postsSlice";
import { userInfosBatch } from "../store/slicers/authSlice";

export const Dashboard = () => {
  const show = {
    profile: false,
    edit: true,
    posts: true,
    reviews: true,
  };

  const [toShow, setToShow] = useState(show);
  const [contentToShow, setContentToShow] = useState(null);

  const { handleFetch, isLoading, error } = useFetcher();

  const userEmail = useSelector(userInfosBatch).email;
  const allPosts = useSelector(selectAllPosts);

  const handleSwitchButton = async (selection) => {
    console.log(selection);
    switch (selection) {
      case "edit":
        setToShow({ ...show, profile: true, edit: false });
        return;
      case "posts":
        const res = allPosts.filter((post) => post.author.id === userEmail);
        setContentToShow(res);
        setToShow({ ...show, profile: true, posts: false });
        return;
      case "reviews":
        setToShow({ ...show, profile: true, reviews: false });
        return;
      case "profile":
        setToShow({ ...show, profile: false, edit: true });
        return;
    }
  };

  const resetShow = () => {
    setToShow({ ...show });
  };

  const isChanged = useMemo(() => {
    return JSON.stringify(show) !== JSON.stringify(toShow);
  }, [toShow]);

  return (
    <div>
      <DashboardActions
        toShow={toShow}
        handleSwitchButton={handleSwitchButton}
      />
      {isChanged && (
        <div
          onClick={resetShow}
          className="flex justify-end p-2 cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faXmarkCircle}
            className="text-red-400 p-2 shadow-lg bg-slate-100 rounded flex space-x-2 "
          />
        </div>
      )}

      <DashboardDisplay contentToShow={contentToShow} />
    </div>
  );
};
