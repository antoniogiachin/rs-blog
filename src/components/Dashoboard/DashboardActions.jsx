// * Import Components
import { TheButton } from "../UI/TheButton";
// * Import FontAwasome
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const DashboardActions = ({ isActionSelected }) => {
  return (
    <div className="p-2 shadow-lg bg-slate-100 rounded flex space-x-2  ">
      {isActionSelected && (
        <TheButton
          className="grow flex justify-center"
          label="Profile"
          icon={faUser}
        />
      )}
      <TheButton
        className="grow flex justify-center"
        label="Edit your profile"
        icon={faPen}
      />
      <TheButton
        className="grow flex justify-center"
        label="See your posts"
        icon={faBlog}
      />
      <TheButton
        className="grow flex justify-center"
        label="Answer Reviews"
        icon={faMessage}
      />
    </div>
  );
};
