// ROUTER
import { createBrowserRouter } from "react-router-dom";
// PAGES
import App from "./App";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Post } from "./pages/Post";
import { Tag } from "./pages/Tag";
import { TagPostList } from "./components/Tag/TagPostList";
// ROUTE PROTECTOR
import { RouteProtector } from "./pages/RouteProtector";
// ERROR PAGE
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
      {
        path: "/dashboard",
        element: <RouteProtector toRender={<Dashboard />} />,
      },
      {
        path: "/tags",
        element: <Tag />,
        children: [
          {
            path: ":name",
            element: <TagPostList />,
          },
        ],
      },
      {
        path: "post/:slug",
        element: <Post />,
        loader: async ({ params }) => {
          try {
            const res = await fetch(
              `${import.meta.env.VITE_BASE_URL}/posts?slug=${params.slug}`
            );
            const json = await res.json();
            return json.data[0];
          } catch (err) {
            console.log(err);
          }
        },
      },
    ],
  },
]);
