import { NavLink, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <span>Ciao</span>
      {/* HEADER  */}
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/login"}>Login</NavLink>
      {/* RENDER PAGES  */}
      <Outlet />
    </>
  );
}

export default App;
