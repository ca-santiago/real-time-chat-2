import React from "react";
import { Navigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";

export const RequireAuth = ({
  children,
}: React.PropsWithChildren<{}>): JSX.Element => {
  const {
    state: { sessionToken },
  } = useAppContext();

  if (sessionToken) return <>{children}</>;
  return <Navigate to="/login" />;
};

export default RequireAuth;
