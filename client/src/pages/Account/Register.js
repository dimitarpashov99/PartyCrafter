import React from "react";
import RegisterForm from "../../components/forms/Authentication/RegistrationForm";
import { useNavigate } from "react-router";

export default function Register() {
    const navigation = useNavigate();
    return <RegisterForm navigation={navigation} />;
}
