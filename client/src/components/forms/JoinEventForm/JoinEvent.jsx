import { Box, List, ListItem } from "@mui/material";
import React from "react";
import { useState } from "react";
import { AuthConsumer } from "../../../contexts";
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
        <>
            {auth.authenticated ? (
                <Box>
                    Your invitations
                    <List>
                        {userInvitations?.map((invite) => (
                            <ListItem key={invite.id}></ListItem>
                        ))}
                    </List>
                </Box>
            ) : (
                <Box component="form">
                    <LoginForm handleLogin={handleLogin} />
                </Box>
            )}
        </>
    );
};

export default JoinEvent;
