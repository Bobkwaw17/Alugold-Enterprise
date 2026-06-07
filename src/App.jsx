
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./shared/components/AppLayout";
import Load from "./shared/components/Load";

const Home = lazy(() => import("./features/Home/Home"));
const NotFound = lazy(() => import("./NotFound"));
const Service = lazy(() => import("./features/Service/Service"));
const About = lazy(() => import("./features/About/About"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "service", element: <Service /> },
      { path: "about", element: <About /> }
    ]
  },
  { path: "*", element: <Load><NotFound /></Load> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}