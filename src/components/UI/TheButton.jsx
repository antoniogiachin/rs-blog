// * React Imports
import { useMemo } from "react";
// * Font Awasome
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TheButton = (props) => {
  const style = useMemo(() => {
    switch (props.type) {
      case "success":
        return "bg-green-400 hover:bg-green-500 text-gray-800";
      case "warning":
        return "bg-yellow-400 hover:bg-yellow-500 text-gray-800";
      case "danger":
        return "bg-red-400 hover:bg-red-500 text-gray-800";
      default:
        return "bg-gray-200 hover:bg-gray-300 text-gray-800";
    }
  }, [props.type]);

  return (
    <button
      type={props.functionToExecute ? "button" : "submit"}
      onClick={props.functionToExecute}
      disabled={props.disabled || props.isLoading}
      className={`inline-flex items-center px-4 py-2 ${style} ${
        props.className
      } text-sm font-medium rounded-md ${
        props.isLoading || props.disabled ? "opacity-25" : ""
      }`}
    >
      {props.isLoading && (
        <FontAwesomeIcon icon={faSpinner} className="mr-2 fa-spin" />
      )}
      {props.icon && !props.isLoading && (
        <FontAwesomeIcon icon={props.icon} className="mr-2" />
      )}
      {props.label}
    </button>
  );
};

TheButton.defaultProps = {
  label: "Please provide a label",
};
