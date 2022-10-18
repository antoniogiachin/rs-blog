// * Import Components
import { TheButton } from "../UI/TheButton";
// * Import FontAwasome
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

export const DashboardActions = ({ handleSwitchButton, toShow }) => {
  return (
    <div className="p-2 shadow-lg bg-slate-100 rounded flex flex-col space-y-2 md:space-x-2 md:space-y-0 md:flex-row  ">
      <TheButton
        functionToExecute={() => {
          handleSwitchButton("edit");
        }}
        className="md:grow flex justify-center"
        label="Edit your profile"
        icon={faPen}
        type={toShow.edit && "success"}
      />
      <TheButton
        functionToExecute={() => {
          handleSwitchButton("posts");
        }}
        className="md:grow flex justify-center"
        label="See your posts"
        icon={faBlog}
        type={toShow.posts && "success"}
      />
      <TheButton
        functionToExecute={() => {
          handleSwitchButton("reviews");
        }}
        className="md:grow flex justify-center"
        label="Answer Reviews"
        icon={faMessage}
        type={toShow.reviews && "success"}
      />
    </div>
  );
};
