// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import {isTokenValid} from '../utils/auth'
import type { ReactNode } from "react";

interface Props {
  children: ReactNode; // Defines children as a React node
}

const ProtectedRoute = ({ children }:Props) => {
  if (!isTokenValid()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;