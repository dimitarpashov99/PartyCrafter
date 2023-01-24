import React from "react";
import LoginForm from "../../components/forms/Authentication/LoginForm";
import { useNavigate } from "react-router";

import { AuthConsumer } from "../../contexts";
import { Container } from "@mui/material";
export default function Login() {
    const navigation = useNavigate();
    const { setAuth } = AuthConsumer();

    const handleLogin = (result) => {
        if (result?.success) {
            const data = result?.data;
            localStorage.setItem("access_token", data?.accessToken);
            setAuth({
                authenticated: true,
                profile: data?.profile,
            });
            navigation("/home");
        }
    };

    return (
        <Container>
            <LoginForm handleLogin={handleLogin} />
        </Container>
    );
}
