import { DashboardUserRecap } from "./DashboardUserRecap";
// * Import FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
// * Import Components
import { EditUserForm } from "./DashoboardContent/EditUserForm";
import { UserPostsManager } from "./DashoboardContent/UserPostsManager";
import { UserReviewsManager } from "./DashoboardContent/UserReviewsManager";

export const DashboardDisplay = ({ isChanged, toShow, resetToShow }) => {
  return (
    <>
      <DashboardUserRecap />
      {isChanged && (
        <div className="flex flex-col space-y-1">
          <div className="flex justify-end p-2">
            <FontAwesomeIcon
              onClick={resetToShow}
              className=" cursor-pointer p-2 bg-slate-100 rounded fa-md text-red-500"
              icon={faXmarkCircle}
            />
          </div>
          <div className="p-2 shadow-lg bg-slate-100 rounded mt-6">
            {JSON.stringify(toShow)}
            {toShow.edit && <EditUserForm />}
            {toShow.posts && <UserPostsManager />}
            {toShow.reviews && <UserReviewsManager />}
          </div>
        </div>
      )}
    </>
  );
};
