import { Box, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { AuthConsumer } from "../../../contexts";
import InvitationsPreview from "../../invitations-preview";
import LoginForm from "../Authentication/LoginForm";
import invitationsService from "../../../services/invitationsService";

const JoinEvent = ({ handleJoinEvent }) => {
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
            });
        }
    };
    useEffect(() => {
        if (auth.authenticated) {
            invitationsService
                .getAllPartyInvitationsForUser(auth?.profile.id)
                .then((result) => {
                    setUserInvitations(result.data);
                })
                .catch(() => {
                    setUserInvitations([]);
                });
        } else {
            setUserInvitations([]);
        }
    }, [auth.authenticated]);

    const handleInvitationSelect = (eventId) => {
        handleJoinEvent(eventId);
    };
    return (
        <React.Fragment>
            {auth.authenticated ? (
                <Box>
                    <Typography component="h4" variant="h5">
                        Your invitations
                    </Typography>
                    <InvitationsPreview
                        invitations={userInvitations}
                        handleInvitationSelect={handleInvitationSelect}
                    />
                </Box>
            ) : (
                <LoginForm handleLogin={handleLogin} />
            )}
        </React.Fragment>
    );
};

export default JoinEvent;
