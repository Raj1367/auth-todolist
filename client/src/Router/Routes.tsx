import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Login from "../Auth/Login";
import Home from "../Pages/Home";
import SignUp from "../Auth/Signup";
import { useUserStore } from "../Zustand/UserStore";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {

  const { isAuthenticated } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AuthUserRoutes = ({ children }: { children: React.ReactNode }) => {

  const { isAuthenticated } = useUserStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "",
        element: (
          <ProtectedRoutes><Home /></ProtectedRoutes>
        ),
      },

      {
        path: "/login",
        element: (
          <AuthUserRoutes><Login /></AuthUserRoutes>
        ),
      },

      {
        path: "/signup",
        element: (
          <AuthUserRoutes><SignUp /></AuthUserRoutes>
        ),
      },
    ],
  },
]);

export default Router;
