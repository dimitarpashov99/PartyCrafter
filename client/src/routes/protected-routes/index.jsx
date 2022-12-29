import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthConsumer } from "../../contexts";

const ProtectedRoutes = () => {
    const { auth } = AuthConsumer();
    return auth?.authenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoutes;
