import { createBrowserRouter, Navigate } from "react-router-dom";
import RequireAuth from "../components/require-auth";
import { ChatsPage } from "../pages/chats";
import { LoginPage } from "../pages/login";
import { RegisterPage } from "../pages/register";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <ChatsPage />
      </RequireAuth>
    ),
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default AppRouter;
