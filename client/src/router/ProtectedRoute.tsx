import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useSelector((store: any) => store.auth);

  if (user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "recruiter") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
