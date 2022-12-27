import React from "react";
import LoginForm from "../../components/forms/Authentication/LoginForm";
import { useNavigate } from "react-router";

import { AuthConsumer } from "../../contexts/authContext";
import { Container } from "@mui/material";
export default function Login() {
    const navigation = useNavigate();
    const { setAuth } = AuthConsumer();

    const handleLogin = (result) => {
        if (result.success) {
            setAuth({ authenticated: true, profile: result?.data?.profile });
        }
    };

    return (
        <Container>
            <LoginForm navigation={navigation} handleLogin={handleLogin} />
        </Container>
    );
}
