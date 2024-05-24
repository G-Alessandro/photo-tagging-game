import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Router = () => {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/game", element: <Game /> },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
