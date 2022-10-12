// router
import { NavLink } from "react-router-dom";
// fontawasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
// redux
import { useSelector } from "react-redux";
// custom hooks
import { useAuth } from "../../hooks/useAuth";
// vfont awasome
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const TheHeader = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);

  const { isLoading, handleLogout, errors } = useAuth();

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
              onClick={handleLogout}
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
