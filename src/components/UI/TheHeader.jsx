// router
import { NavLink, useNavigate } from "react-router-dom";
// fontawasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  loginStatus,
  handleLogout,
  authErrorBatch,
  authStatus,
} from "../../store/slicers/authSlice";

// vfont awasome
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const TheHeader = () => {
  const isLogged = useSelector(loginStatus);
  const error = useSelector(authErrorBatch);
  const isLoading = useSelector(authStatus);

  const navigate = useNavigate();

  const doHandleLogout = async () => {
    const { payload } = await dispatch(handleLogout());
    if (payload.success) {
      navigate("/login");
    }
  };

  const dispatch = useDispatch();

  return (
    <header className="fixed top-0 w-full">
      <nav className="flex justify-between items-center bg-slate-400 px-6 h-12 shadow-lg">
        {/* left  */}
        <ul>
          <li>
            <NavLink className="flex items-center space-x-2" to={"/"}>
              <FontAwesomeIcon icon={faWandMagicSparkles} />
              <span>Supabase Blog!</span>
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
              <NavLink to={"/dashboard"}>Dashoboard</NavLink>
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
