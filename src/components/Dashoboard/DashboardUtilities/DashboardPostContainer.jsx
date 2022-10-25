// * Import custopm components
import { TheBadge } from "../../UI/TheBadge";
import { TheButton } from "../../UI/TheButton";

export const DashboardPostContainer = ({ post }) => {
  const tagsRender = post.tags.map((tag) => (
    <TheBadge key={tag} severity="info" label={tag} />
  ));

  return (
    <div className="rounded shadow-lg border-slate-500 p-2">
      <h3 className="text-xl">{post.title}</h3>
      <p className="text-md">{post.content.slice(100)}...</p>
      <div className="p-2 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-column space-y-2 px-1">
          <p>
            Reviews: <span className="font-bold">{post.reviews.lenght}</span>{" "}
          </p>
          <div className="grid grid-cols-2 gap-2">{tagsRender}</div>
        </div>
        <div className="flex flex-column space-y-2 px-1">
          <p>{post.slug}</p>
          <div>
            <TheButton label={`Go to ${post.title}`} />
          </div>
        </div>
      </div>
    </div>
  );
};
