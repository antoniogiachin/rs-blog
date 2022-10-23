// router
import { NavLink, useNavigate } from "react-router-dom";
// fontawasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
// redux
import { useLogoutMutation } from "../../api/modules/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStatus,
  RESET,
  // handleLogout,
  // authErrorBatch,
  // authStatus,
} from "../../store/slicers/authSlice";

// vfont awasome
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { RESET_ERROR, SET_ERROR } from "../../store/slicers/errorSlice";

export const TheHeader = () => {
  // * Redux
  const isLogged = useSelector(loginStatus);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const doHandleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(RESET());
      navigate("/login");
    } catch (err) {
      SET_ERROR({ message: err.data.message, status: err.data.status });
      setTimeout(() => {
        RESET_ERROR();
      }, 5000);
    }
  };

  return (
    <header className="fixed top-0 w-full">
      <nav className="flex justify-between items-center bg-slate-400 px-6 h-12 shadow-lg">
        {/* left  */}
        <ul>
          <li>
            <NavLink className="flex items-center space-x-2" to={"/"}>
              <FontAwesomeIcon icon={faWandMagicSparkles} />
              <span>Tonino's blog!</span>
            </NavLink>
          </li>
        </ul>
        {/* right  */}
        <ul className="flex space-x-5">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          {!isLogged && (
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
          )}
          {isLogged && (
            <li>
              <NavLink to={"/dashboard"}>Dashboard</NavLink>
            </li>
          )}
          {isLogged && (
            <li
              onClick={doHandleLogout}
              className={`flex space-x-2 items-center cursor-pointer ${
                isLoading && "opacity-25"
              }`}
            >
              {isLoading && (
                <FontAwesomeIcon icon={faSpinner} className="fa-spin text-xs" />
              )}
              <span>Logout</span>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
