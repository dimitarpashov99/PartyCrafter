import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthConsumer } from "../../contexts/authContext";

const ProtectedRoutes = () => {
    const { auth } = AuthConsumer();
    return auth?.authenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoutes;
