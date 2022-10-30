// * Import custopm components
import { TheBadge } from "./TheBadge";
// * Import Router
import { useNavigate } from "react-router-dom";

export const TheContainer = ({ output, mode, children }) => {
  // router
  const navigate = useNavigate();

  let tagsRender;
  if (mode === "post") {
    tagsRender = output.tags.map((tag) => (
      <TheBadge key={tag._id} severity="info" label={tag.name} />
    ));
  }

  let additionalInfos;
  switch (mode) {
    case "review":
      additionalInfos = <p>reviws</p>;
      break;
    default:
      additionalInfos = (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
          <div className="flex flex-col space-y-2">
            <p>
              Reviews:{" "}
              <span className="font-bold">{output.reviews.lenght || "0"}</span>
            </p>
            <div className="grid grid-cols-2 gap-2">{tagsRender}</div>
          </div>
          <div className="flex flex-col space-y-2 items-end ">
            <p>{output.slug}</p>
            <div>
              {/* <Link to={`/post/${post.slug}`}>
                <TheButton
                  icon={faPlane}
                  type="success"
                  label={`Go to ${post.title}`}
                  functionToExecute={handlePostNavigate}
                />
              </Link> */}
              {/* actions sono children  */}
              {children}
            </div>
          </div>
        </div>
      );
      break;
  }

  return (
    <div className="rounded shadow-lg border-slate-800 bg-slate-200 p-2 flex flex-col space-y-2">
      <h3 className="text-xl">{output.title}</h3>
      <p className="text-md">
        {mode === "post"
          ? `${output.content.slice(0, 100)} ...`
          : output.content}
      </p>
      {additionalInfos}
    </div>
  );
};
