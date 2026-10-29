
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./shared/components/AppLayout";
import Load from "./shared/components/Load";

const Home = lazy(() => import("./features/Home/Home"));
const NotFound = lazy(() => import("./NotFound"));
const Service = lazy(() => import("./features/Service/Service"));
const About = lazy(() => import("./features/About/About"));
const Admin = lazy(() => import("./features/Admin/Admin"));


const router = createBrowserRouter([
  // Admin has its own layout (no public navbar/footer)
  { path: "/admin/*", element: <Load><Admin /></Load> },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "service", element: <Service /> },
      { path: "about", element: <About /> },
      { path: "*", element: <NotFound /> }
    ]
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}