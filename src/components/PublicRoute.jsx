import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const authHeaders = JSON.parse(localStorage.getItem("authHeaders"));

  const isAuthenticated =
    authHeaders &&
    authHeaders["access-token"] &&
    authHeaders["client"] &&
    authHeaders["uid"];

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;
