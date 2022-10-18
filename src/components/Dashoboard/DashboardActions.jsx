// * Import Components
import { TheButton } from "../UI/TheButton";
// * Import FontAwasome
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";


export const DashboardActions = ({ toShow, handleSwitchButton }) => {
  return (
    <div className="p-2 shadow-lg bg-slate-100 rounded flex space-x-2  ">
      {toShow.profile && (
        <TheButton
          functionToExecute={() => {
            handleSwitchButton("profile");
          }}
          className="grow flex justify-center"
          label="Profile"
          icon={faUser}
        />
      )}
      {toShow.edit && (
        <TheButton
          functionToExecute={() => {
            handleSwitchButton("edit");
          }}
          className="grow flex justify-center"
          label="Edit your profile"
          icon={faPen}
        />
      )}
      {toShow.posts && (
        <TheButton
          functionToExecute={() => {
            handleSwitchButton("posts");
          }}
          className="grow flex justify-center"
          label="See your posts"
          icon={faBlog}
        />
      )}
      {toShow.reviews && (
        <TheButton
          functionToExecute={() => {
            handleSwitchButton("reviews");
          }}
          className="grow flex justify-center"
          label="Answer Reviews"
          icon={faMessage}
        />
      )}
    </div>
  );
};
