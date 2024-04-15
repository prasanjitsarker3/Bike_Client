import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import { routeGenerator } from "../Utlis/routeGenerator";
import { managerRoutePaths } from "./manager.routes";
import { userRoutePaths } from "./user.routes";
import ProtectedRoute from "../components/Layout/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
  },
  {
    path: "manager",
    element: (
      <ProtectedRoute role="manager">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(managerRoutePaths),
  },
  {
    path: "user",
    element: (
      <ProtectedRoute role="user">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(userRoutePaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
