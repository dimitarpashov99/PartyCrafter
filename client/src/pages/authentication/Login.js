import React from "react";
import LoginForm from "../../components/forms/Authentication/LoginForm";
import { useNavigate } from "react-router";

import { AuthConsumer } from "../../contexts/authContext";
import { Container } from "@mui/material";
export default function Login() {
    const navigation = useNavigate();
    const { setAuth } = AuthConsumer();

    const handleLogin = (data) => {
        setAuth({ authenticated: true, profile: data.profile });
    };
    return (
        <Container>
            <LoginForm navigation={navigation} handleLogin={handleLogin} />
        </Container>
    );
}
