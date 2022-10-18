// * Import Redux
import { useSelector } from "react-redux";
import { userInfosBatch } from "../../store/slicers/authSlice";
// * Import FontAwasome
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const DashboardUserRecap = () => {
  const userInfos = useSelector(userInfosBatch);

  return (
    <div className="p-2 shadow-lg bg-slate-100 rounded grid grid-cols-4 gap-y-3 mt-6">
      <div className="col-span-4 md:col-span-3">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <h3 className="text-2xl">Username: {userInfos.username}</h3>
          <h3 className="text-2xl">Email: {userInfos.email}</h3>
        </div>
        <div className="flex flex-col my-2 md:my-0 md:flex-row space-y-1 md:space-y-0 md:space-x-2">
          <h4 className="text-lg">{userInfos.name}</h4>
          <h4 className="text-lg">{userInfos.surname}</h4>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <p>Post written: {userInfos.posts.length || 0}</p>
          <p>Review received: {userInfos.posts.length || 0}</p>
        </div>
      </div>
      {userInfos.isAuthor && (
        <div className="col-span-4 md:col-span-1 flex items-center space-x-2 md:space-x-0 md:justify-center">
          <FontAwesomeIcon
            className="fa-2xl text-green-400 opacity-80"
            icon={faCircleCheck}
          />
          <span className="md:absolute md:mt-6 md:ml-8 opacity-70">Author</span>
        </div>
      )}
    </div>
  );
};
