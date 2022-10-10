// router
import { NavLink } from "react-router-dom";
// fontawasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

export const TheHeader = () => {
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
          <li>
            <NavLink to={"/login"}>Login</NavLink>
          </li>
          {/* <li>
            <NavLink to={"/"}></NavLink>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};
