// * Import React
import { useState } from "react";
// * Import Components
import { DashboardActions } from "../components/Dashoboard/DashboardActions";
import { DashboardDisplay } from "../components/Dashoboard/DashboardDisplay";

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

  return (
    <div>
      <DashboardActions
        toShow={toShow}
        handleSwitchButton={handleSwitchButton}
      />
      <DashboardDisplay />
    </div>
  );
};
