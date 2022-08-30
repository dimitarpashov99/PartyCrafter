import React from "react";
import LoginForm from "../../components/forms/Authentication/LoginForm";
import { useNavigate } from "react-router";

export default function Login() {
    const navigation = useNavigate();
    return <LoginForm navigation={navigation} />;
}
