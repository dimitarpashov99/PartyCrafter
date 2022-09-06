import React, { useEffect } from "react";
import LoginForm from "../../components/forms/Authentication/LoginForm";
import { useNavigate } from "react-router";

import { AuthConsumer } from "../../contexts/authContext";
import { Container } from "@mui/material";
export default function Login() {
    const navigation = useNavigate();
    const { auth, setAuth } = AuthConsumer();

    const handleLogin = () => {
        setAuth(true);
        console.log(auth);
    };
    return (
        <Container>
            <LoginForm navigation={navigation} handleLogin={handleLogin} />
        </Container>
    );
}
