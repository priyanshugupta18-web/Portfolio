import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import Home from "../Sections/Home";
import About from "../Sections/About";
import Lab from "../Sections/Lab";
import Stack from "../Sections/Stack";
import Projects from "../Sections/Projects";
import ProjectDetail from "../Sections/ProjectDetail";
import Contact from "../Sections/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: < RootLayout />,
    children: [
      {
        index: true,
        element: < Home />,
      },
      {
        path: "about",
        element: < About />,
      },
      {
        path: "lab",
        element: < Lab />,
      },
      {
        path: "stack",
        element: < Stack />,
      },
      {
        path: "projects",
        element: < Projects />,
      },
      {
        path: "projects/:slug",
        element: < ProjectDetail />,
      },
      {
        path: "contact",
        element: < Contact />,
      },
    ],
  },
]);

export default router;
