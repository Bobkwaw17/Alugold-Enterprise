
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Home = lazy(() => import("./features/Home/Home"));
const NotFound  = lazy(() => import("./NotFound"));
const Service = lazy(() => import("./features/Service/Service"));
const About = lazy(() => import("./features/About/About"));


const Load = ({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

const router = createBrowserRouter([
  { path: "/",        element: <Load><Home /></Load> },
  { path: "/service", element: <Load><Service /></Load> },
  { path: "/about",   element: <Load><About /></Load> },
  { path: "*",        element: <Load><NotFound /></Load> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
