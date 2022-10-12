// * Import React
import { useState } from "react";
// * Import Components
import { DashboardActions } from "../components/Dashoboard/DashboardActions";

export const Dashboard = () => {
  const [isActionSelected, setIsActionSelected] = useState(false);

  return (
    <div>
      Dashboard
      <DashboardActions isActionSelected={isActionSelected} />
    </div>
  );
};
