// * Imports Router
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
// * Imports Redux
import { useSelector } from "react-redux";
import { selectAllTags } from "../store/slicers/tagsSlice";
// * Import Components
import { TheBadge } from "../components/UI/TheBadge";

export const Tag = () => {
  const tags = useSelector(selectAllTags);
  const navigate = useNavigate();

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

  return (
    <section>
      <h2 className="text-4xl font-Lobster">Search posts by tags</h2>
      <article className=" mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-16 lg:gap-20">
        {tagListRender}
      </article>
      <Outlet />
    </section>
  );
};
