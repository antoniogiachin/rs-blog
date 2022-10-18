// * Import React
import { useState, useMemo } from "react";

// * Import Components
import { DashboardActions } from "../components/Dashoboard/DashboardActions";
import { DashboardDisplay } from "../components/Dashoboard/DashboardDisplay";

export const Dashboard = () => {
  const show = {
    edit: false,
    posts: false,
    reviews: false,
  };

  const [toShow, setToShow] = useState(show);

  const handleSwitchButton = async (selection) => {
    switch (selection) {
      case "edit":
        setToShow({ ...show, edit: true });
        return;
      case "posts":
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
