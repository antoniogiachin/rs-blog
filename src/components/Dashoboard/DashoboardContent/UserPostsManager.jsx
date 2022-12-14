// * Import Redux
import { useSelector } from "react-redux";
import { userPostsBatch } from "../../../store/slicers/authSlice";
// * Import Components
import { TheButton } from "../../UI/TheButton";
import { TheContainer } from "../../UI/TheContainer";
import { DashboardPostForm } from "../DashboardUtilities/DashboardPostForm";
// * Import FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
// * Import Router
import { Link } from "react-router-dom";

export const UserPostsManager = ({ extra }) => {
  // redux posts
  const userPosts = useSelector(userPostsBatch);

  const handlePostNavigate = (slug) => {
    navigate(`/post/${slug}`);
  };

  let postRecap;
  if (userPosts.length) {
    postRecap = userPosts.map((post) => (
      <div key={post.title}>
        <TheContainer
          output={post}
          mode="post"
          children={
            <Link to={`/post/${post.slug}`}>
              <TheButton
                icon={faPlane}
                type="success"
                label={`Go to ${post.title}`}
                functionToExecute={() => {
                  handlePostNavigate(post.slug);
                }}
              />
            </Link>
          }
        />
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
