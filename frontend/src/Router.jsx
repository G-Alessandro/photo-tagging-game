import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/home-page/HomePage.jsx"
import Game from "./components/game/Game.jsx"

const Router = () => {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/game", element: <Game /> },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
