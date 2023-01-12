import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home";
import ContactUs from "../pages/contactus";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";

import Layout from "../layouts";
import PageNotFound from "../components/page-not-found";
import Events from "../pages/PCEvents";
import CreateEvent from "../pages/PCEvents/CreateEvent";
import JoinEvent from "../pages/PCEvents/JoinEvent";
import { AuthProvider } from "../contexts";

import ProtectedRoutes from "./protected-routes";
import AccountPage from "../pages/account";
import Preview from "../pages/PCEvents/Preview";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route
                            index
                            element={<Navigate to="/home" replace />}
                        />
                        <Route path="home" element={<Home />} />
                        <Route path="events">
                            <Route index element={<Events />} />
                            <Route element={<ProtectedRoutes />}>
                                <Route
                                    path="create"
                                    element={<CreateEvent />}
                                />
                            </Route>
                            <Route path="preview/:code" element={<Preview />} />
                            <Route path="join" element={<JoinEvent />} />
                        </Route>
                        <Route path="contactus" element={<ContactUs />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route element={<ProtectedRoutes />}>
                            <Route path="account" element={<AccountPage />}>
                                <Route
                                    path=":id"
                                    element={<AccountPage />}
                                ></Route>
                            </Route>
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default AppRoutes;
