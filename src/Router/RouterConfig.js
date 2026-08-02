import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import { Home } from "../pages";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "*", Component: Home },
    ],
  },
]);

export default Router;
