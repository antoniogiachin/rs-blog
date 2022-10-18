// * Import React
import { useState, useMemo } from "react";
// * Import Components
import { DashboardActions } from "../components/Dashoboard/DashboardActions";
import { DashboardDisplay } from "../components/Dashoboard/DashboardDisplay";
// * Import FontAwasome
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Dashboard = () => {
  const show = {
    profile: false,
    edit: true,
    posts: true,
    reviews: true,
  };

  const [toShow, setToShow] = useState(show);

  const handleSwitchButton = (selection) => {
    console.log(selection);
    switch (selection) {
      case "edit":
        setToShow({ ...show, profile: true, edit: false });
        return;
      case "posts":
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

      <DashboardDisplay />
    </div>
  );
};
