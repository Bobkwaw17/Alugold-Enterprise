// src/pages/NotFound.tsx
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} – ${error.statusText}`
    : "Something went wrong.";

  return (
    <div>
      <h1>{message}</h1>
      <Link to="/">Go home</Link>
    </div>
  );
}
