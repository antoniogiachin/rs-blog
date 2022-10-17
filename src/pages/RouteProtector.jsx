// * Redux
import { useSelector } from "react-redux";
// * Import Login
import { Login } from "../pages/Login";

export const RouteProtector = ({ toRender }) => {
  const isLogged = useSelector((state) => state.auth.isLogged);

  return isLogged ? toRender : <Login />;
};
