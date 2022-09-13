import { Navigate } from "react-router-dom";

export default function ProtectedRoutesLogin(props) {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) {
    return <Navigate to="/" replace />;
  }

  return props.children;
}
