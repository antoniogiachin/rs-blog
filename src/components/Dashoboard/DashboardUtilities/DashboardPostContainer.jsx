// * Import custopm components
import { TheBadge } from "../../UI/TheBadge";
import { TheButton } from "../../UI/TheButton";
// * Import FontAwasome
import { faPlane } from "@fortawesome/free-solid-svg-icons";
// * Import Router
import { Link, useNavigate } from "react-router-dom";

export const DashboardPostContainer = ({ post }) => {
  // router
  const navigate = useNavigate();

  const tagsRender = post.tags.map((tag) => (
    <TheBadge key={tag._id} severity="info" label={tag.name} />
  ));

  const handlePostNavigate = (slug) => {
    navigate(`/post/${slug}`);
  };

  return (
    <div className="rounded shadow-lg border-slate-800 bg-slate-200 p-2 flex flex-col space-y-2">
      <h3 className="text-xl">{post.title}</h3>
      <p className="text-md">{post.content.slice(0, 100)} ...</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
        <div className="flex flex-col space-y-2">
          <p>
            Reviews:{" "}
            <span className="font-bold">{post.reviews.lenght || "0"}</span>
          </p>
          <div className="grid grid-cols-2 gap-2">{tagsRender}</div>
        </div>
        <div className="flex flex-col space-y-2 items-end ">
          <p>{post.slug}</p>
          <div>
            <Link to={`/post/${post.slug}`}>
              <TheButton
                icon={faPlane}
                type="success"
                label={`Go to ${post.title}`}
                functionToExecute={handlePostNavigate}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
