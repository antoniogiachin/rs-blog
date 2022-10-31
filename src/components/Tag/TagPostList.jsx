// * Imports Router
import { useNavigate } from "react-router-dom";
// * Imports FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

export const TagPostList = () => {
  const navigate = useNavigate();

  return (
    <article>
      <div className="flex justify-end">
        <FontAwesomeIcon
          onClick={() => {
            navigate("/tags");
          }}
          className=" cursor-pointer p-2 bg-slate-100 rounded fa-md text-red-500"
          icon={faXmarkCircle}
        />
      </div>
      TagPostList
    </article>
  );
};
