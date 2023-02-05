import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/reusable/Loading";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const {
    user: { email },
    isLoading,
  } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
