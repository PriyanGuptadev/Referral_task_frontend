import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authHeaders = JSON.parse(localStorage.getItem("authHeaders"));

  const isAuthenticated =
    authHeaders &&
    authHeaders["access-token"] &&
    authHeaders["client"] &&
    authHeaders["uid"];

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
