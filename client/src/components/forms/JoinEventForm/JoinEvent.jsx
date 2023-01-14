import { Box, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { AuthConsumer } from "../../../contexts";
import InvitationsPreview from "../../invitations-preview";
import LoginForm from "../Authentication/LoginForm";

const JoinEvent = () => {
    const { auth } = AuthConsumer();
    const [userInvitations, setUserInvitations] = useState([]);
    const handleLogin = (result) => {
        const { setAuth } = AuthConsumer();
        if (result?.success) {
            const data = result?.data;
            localStorage.setItem("access_token", data?.accessToken);
            setAuth({
                authenticated: true,
                profile: data?.profile,
                invitations: data?.invitations,
            });
            setUserInvitations(result.data.invitations);
        }
    };
    return (
        <React.Fragment>
            {auth.authenticated ? (
                <Box>
                    <Typography component="h4" variant="h5">
                        Your invitations
                    </Typography>
                    <InvitationsPreview invitations={userInvitations} />
                </Box>
            ) : (
                <LoginForm handleLogin={handleLogin} />
            )}
        </React.Fragment>
    );
};

export default JoinEvent;
