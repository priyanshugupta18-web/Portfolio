import { createBrowserRouter } from "react-router-dom";
import RouteLayout from "../Layout/RootLayout";
import Home from "../pages/home";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: RouteLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);

export default Router;