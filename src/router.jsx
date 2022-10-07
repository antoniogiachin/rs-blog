// ROUTER
import { createBrowserRouter } from "react-router-dom";
//PAGES
import App from "./App";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { ErrorPage } from "./pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
