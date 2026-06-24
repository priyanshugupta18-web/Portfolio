import { createBrowserRouter } from "react-router-dom";
import RouteLayout from "../Layout/RootLayout";
import {Home, About, Skills, Projects, Contact} from "../pages";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: RouteLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path:"about",
        Component:About,
      },
      {
        path:"skills",
        Component:Skills,
      },
      {
        path:"projects",
        Component:Projects,
      },
      {
        path:"contact",
        Component:Contact,
      }
    ],
  },
]);

export default Router;