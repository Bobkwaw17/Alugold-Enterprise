import { Suspense } from "react";

export default function Load({ children }) {

  return (
    <Suspense fallback={<div>Loadind...</div>}>{children}</Suspense>
  )
}