import React from "react";
import { Navigate } from "react-router-dom";
import { serviceAccount } from "../services/Auth.Service";
const AuthGaurd = ({ children }) => {
    //console.log(serviceAccount.isLogger());
  if (!serviceAccount.isLogger()) return <Navigate to="/auth/login" />;
  return children;
};

export default AuthGaurd;
