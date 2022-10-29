// * Import Redux
import { useSelector } from "react-redux";
import { userPostsBatch } from "../../../store/slicers/authSlice";
// * Import Components
import { DashboardPostContainer } from "../DashboardUtilities/DashboardPostContainer";
import { DashboardPostForm } from "../DashboardUtilities/DashboardPostForm";
// * Import FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";

export const UserPostsManager = ({ extra }) => {
  // redux posts
  const userPosts = useSelector(userPostsBatch);

  let postRecap;
  if (userPosts.length) {
    postRecap = userPosts.map((post) => (
      <div key={post.title}>
        <DashboardPostContainer post={post} />
      </div>
    ));
  } else {
    postRecap = (
      <div className="flex space-x-2 items-center justify-center">
        <FontAwesomeIcon
          className="text-purple-800 fa-2x"
          icon={faFaceSadTear}
        />
        <p className="font-bold text-xl text-center">No posts</p>
      </div>
    );
  }

  let postAdd = <DashboardPostForm />;

  return (
    <div className="grid grid-cols-1 gap-2">
      <div className={extra ? "hidden" : "block"}>{postRecap}</div>
      <div className={extra ? "block" : "hidden"}>{postAdd}</div>
    </div>
  );
};
