
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Home = lazy(() => import("./features/Home/Home"));
const NotFound  = lazy(() => import("./NotFound"));

const Load = ({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

const router = createBrowserRouter([
  { path: "/",        element: <Load><Home /></Load> },
  { path: "*",        element: <Load><NotFound /></Load> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
