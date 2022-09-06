import React from "react";
import RegisterForm from "../../components/forms/Authentication/RegistrationForm";
import { useNavigate } from "react-router";
import { Container } from "@mui/material";

export default function Register() {
    const navigation = useNavigate();

    return (
        <Container>
            <RegisterForm navigation={navigation} />
        </Container>
    );
}
