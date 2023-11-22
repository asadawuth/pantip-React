import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import Register from "../pages/Register";
import Broadcast from "../pages/Boardcast";

const router = createBrowserRouter([
  { path: `/`, element: <HomePage /> },
  { path: `/login`, element: <LoginPage /> },
  { path: `/Register`, element: <Register /> },
  { path: `/BroadcastRoom`, element: <Broadcast /> },
]);

export default function Route() {
  return <RouterProvider router={router} />;
}
