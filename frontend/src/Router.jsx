import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/home-page/HomePage.jsx"
import GamePage from "./components/game-page/GamePage.jsx"

const Router = () => {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/game-page", element: <GamePage /> },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
