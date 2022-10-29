import { useState } from "react";
// * Import FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
// * Import Components
import { EditUserForm } from "./DashoboardContent/EditUserForm";
import { UserPostsManager } from "./DashoboardContent/UserPostsManager";
import { UserReviewsManager } from "./DashoboardContent/UserReviewsManager";
import { DashboardUserRecap } from "./DashboardUserRecap";
import { TheButton } from "../UI/TheButton";

export const DashboardDisplay = ({ isChanged, toShow, resetToShow }) => {
  const [extra, setExtra] = useState(false);

  const showExtra = () => {
    setExtra((prevExtra) => !prevExtra);
  };


  let extraButton;
  if (toShow.posts) {
    extraButton = (
      <TheButton
        icon={extra ? faMinusCircle : faPlusCircle}
        label={extra ? "Close edit post" : "Add new post"}
        type={extra ? "warning" : "success"}
        functionToExecute={showExtra}
      />
    );
  }

  return (
    <>
      <DashboardUserRecap />
      {isChanged && (
        <div className="flex flex-col space-y-1">
          <div
            className={`flex ${
              extraButton ? "justify-between" : "justify-end"
            } items-center space-x-2 p-2`}
          >
            {extraButton}
            <FontAwesomeIcon
              onClick={resetToShow}
              className=" cursor-pointer p-2 bg-slate-100 rounded fa-md text-red-500"
              icon={faXmarkCircle}
            />
          </div>
          <div className="p-2 shadow-lg bg-slate-100 rounded mt-6">
            {JSON.stringify(toShow)}
            {toShow.edit && <EditUserForm />}
            {toShow.posts && <UserPostsManager extra={extra} />}
            {toShow.reviews && <UserReviewsManager />}
          </div>
        </div>
      )}
    </>
  );
};
