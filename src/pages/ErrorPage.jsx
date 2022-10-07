// ROUTER ERRORS
import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="h-screen grid place-items-center bg-slate-200">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-2xl opacity-75">Oops! This is embarassing...</h2>
        <h3 className="text-3xl">{error.status}</h3>
        <h3 className="text-sm italic opacity-30">{error.statusText}</h3>
      </div>
    </div>
  );
};
