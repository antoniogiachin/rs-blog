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
import { userPostsBatch } from "../store/slicers/authSlice";

export const Dashboard = () => {
  const show = {
    edit: false,
    posts: false,
    reviews: false,
  };

  const [toShow, setToShow] = useState(show);
  const [contentToShow, setContentToShow] = useState(null);

  const { handleFetch, isLoading, error } = useFetcher();

  const allUserPosts = useSelector(userPostsBatch);

  const handleSwitchButton = async (selection) => {
    console.log(selection);
    switch (selection) {
      case "edit":
        setToShow({ ...show, edit: true });
        return;
      case "posts":
        setContentToShow(allUserPosts);
        setToShow({ ...show, posts: true });
        return;
      case "reviews":
        setToShow({ ...show, reviews: true });
        return;
    }
  };

  const isChanged = useMemo(() => {
    return Object.values(toShow).some((val) => val === true);
  }, [toShow]);

  const resetToShow = () => {
    setToShow({ ...show });
  };

  return (
    <div>
      <DashboardActions
        handleSwitchButton={handleSwitchButton}
        toShow={toShow}
      />

      <DashboardDisplay
        isChanged={isChanged}
        toShow={toShow}
        resetToShow={resetToShow}
      />
    </div>
  );
};
