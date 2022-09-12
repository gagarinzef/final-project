import { Navigate } from "react-router-dom";

const ProtectedRoutesHome = (props) => {
  const access_token = localStorage.getItem("access_token"); // ACCESS TOKEN localstorage

  if (access_token) {
    return <Navigate to="/projects" replace />;
  }

  return props.children;
};

export default ProtectedRoutesHome;
