// * Import React
import { useState } from "react";
// * Import Components
import { DashboardActions } from "../components/Dashoboard/DashboardActions";
import { DashboardDisplay } from "../components/Dashoboard/DashboardDisplay";

export const Dashboard = () => {
  const [isActionSelected, setIsActionSelected] = useState(false);
  const [actionSelected, setActionSelected] = useState("");

  return (
    <div>
      Dashboard
      <DashboardActions
        isActionSelected={(isActionSelected, setActionSelected)}
      />
      <DashboardDisplay />
    </div>
  );
};
