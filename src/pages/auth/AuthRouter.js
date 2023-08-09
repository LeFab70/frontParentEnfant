import React from "react";
import { Route, Routes } from "react-router-dom";
import Errors from "../../utils/Errors";
//import Login from "./Login";
import { lazy, Suspense } from "react";
const AuthRouter = () => {
  const Login = lazy(() => import("./Login"));
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Errors />} />
      </Routes>
    </Suspense>
  );
};

export default AuthRouter;
