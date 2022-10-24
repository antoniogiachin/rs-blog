import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TheLoader = () => {
  return (
    <div className="fixed top-0 w-full h-screen grid place-items-center bg-black opacity-50">
      <FontAwesomeIcon
        icon={faSpinner}
        className="mr-2 fa-spin z-50 text-white fa-10x"
      />
    </div>
  );
};
