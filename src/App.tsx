import { lazy, memo, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Home from "./pages/home/Home";
const Phone = lazy(() => import("./pages/phone/Phone"));
const Layout = lazy(() => import("./pages/layout/Layout"));
const NotFound = lazy(() => import("./pages/not-found/NotFound"));

const App = () => {
  return (
    <div>
      <Suspense fallback={
        <div className="h-screen flex justify-center items-center">
          <div className="loader"></div>
        </div>
        }>
        {useRoutes([
          {
            path: "/",
            element: <Layout />,
            children: [
              { index: true, element: <Home /> },
              { path: "/phone", element: <Phone /> },
            ],
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ])}
      </Suspense>
    </div>
  );
};

export default memo(App);
