import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  return !localStorage.getItem("token") ? <Navigate to="/login" /> : children;
}

export default ProtectedRoute;
