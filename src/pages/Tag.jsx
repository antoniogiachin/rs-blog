// * Imports Router
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
// * Imports Redux
import { useSelector } from "react-redux";
import { selectAllTags } from "../store/slicers/tagsSlice";
import { selectAllPosts } from "../store/slicers/postsSlice";
// * Import Components
import { TheBadge } from "../components/UI/TheBadge";
import { TheContainer } from "../components/UI/TheContainer";
import { TheButton } from "../components/UI/TheButton";
// * Import FontAwasome
import { faPlane } from "@fortawesome/free-solid-svg-icons";

export const Tag = () => {
  const tags = useSelector(selectAllTags);
  const allPosts = useSelector(selectAllPosts);

  // router
  const navigate = useNavigate();
  const path = useLocation();

  const isChildrenRoute = path.pathname.lastIndexOf("/") > 1;

  const tagListRender = tags?.map((tag, index) => (
    <TheBadge
      key={index}
      label={tag.name}
      severity="info"
      functionToExecute={() => {
        navigate(`/tags/${tag.name}`);
      }}
    />
  ));

  const allPostsRender = allPosts.map((post) => (
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
                navigate(`/post/${post.slug}`);
              }}
            />
          </Link>
        }
      />
    </div>
  ));

  return (
    <section>
      <h2 className="text-4xl font-Lobster">Search posts by tags</h2>
      <article className=" mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-16 lg:gap-20">
        {tagListRender}
      </article>
      {!isChildrenRoute && (
        <div className="grid grid-cols-1 gap-4 mt-4">{allPostsRender}</div>
      )}
      <Outlet />
    </section>
  );
};
