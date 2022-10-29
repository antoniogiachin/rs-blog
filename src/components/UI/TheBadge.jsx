// * Imports FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// * Imports React
import { useMemo } from "react";

export const TheBadge = ({ label, severity, shape, icon }) => {
  const severityColor = useMemo(() => {
    switch (severity) {
      case "success":
        return "bg-green-400 text-gray-800";
      case "info":
        return "bg-blue-400 text-gray-800";
      case "warning":
        return "bg-yellow-400 text-gray-800";
      case "danger":
        return "bg-red-400 text-gray-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  }, [severity]);

  const shapeClass = useMemo(() => {
    switch (shape) {
      case "rounded":
        return "rounded";
      default:
        return "";
    }
  }, [severity]);

  return (
    <div className={`p-2 ${severityColor} ${shapeClass} shadow-lg`}>
      {icon && <FontAwesomeIcon icon={icon} />}
      {label}
    </div>
  );
};

TheBadge.defaultProps = {
  label: "Please provide a label!",
  severity: "info",
};
