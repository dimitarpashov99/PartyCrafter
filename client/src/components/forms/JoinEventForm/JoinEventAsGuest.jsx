import { Box, Button, MenuItem, Paper, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import invitationsService from "../../../services/invitationsService";
import CustomizedAlert from "../../alert";

const JoinEventAsGuest = ({ handleJoinEvent }) => {
    const [formState, setFormState] = useState({
        eventId: undefined,
        guestIdentifier: undefined,
        guestIdentifierType: "name",
    });
    const [alert, setAlert] = useState({ open: false });
    const submitJoinEvent = async () => {
        let invitaion;
        switch (formState.guestIdentifierType) {
            case "name":
                invitaion = await invitationsService.getGuestInvitationByName(
                    formState.eventId,
                    formState.guestIdentifier
                );
                break;
            case "email":
                invitaion = await invitationsService.getGuestInvitationByEmail(
                    formState.eventId,
                    formState.guestIdentifier
                );
                break;
            case "phone":
                invitaion = await invitationsService.getGuestInvitationByPhone(
                    formState.eventId,
                    formState.guestIdentifier
                );
                break;
            default:
                return setAlert({
                    open: true,
                    type: "error",
                    title: "Correct identifier must be provided",
                    message: "",
                });
        }

        if (!invitaion || invitaion.error) {
            return setAlert({
                open: true,
                type: "error",
                title: invitaion.title,
                message: invitaion.message,
            });
        }
        // if (result.data.accessToken) {
        //     localStorage.setItem("access_token", result?.accessToken);
        // }
        handleJoinEvent({ eventId: invitaion.eventId });
    };
    return (
        <>
            <Paper
                sx={{
                    width: "100%",
                    paddingTop: 8,
                    paddingBottom: 15,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "background.default",
                }}
                elevation={10}
            >
                <Box component="form">
                    <CustomizedAlert alert={alert} />
                    <Stack direction="column" spacing={3}>
                        <TextField
                            required
                            id="event-code"
                            label="Party Code"
                            name="event-code"
                            onChange={(e) => {
                                setFormState((current) => ({
                                    ...current,
                                    eventId: e.target.value,
                                }));
                            }}
                        />
                        <TextField
                            label="Identifier"
                            select
                            onChange={(e) => {
                                setFormState((current) => ({
                                    ...current,
                                    guestIdentifierType: e.target.value,
                                }));
                            }}
                            defaultValue="name"
                        >
                            <MenuItem value="name">Name</MenuItem>
                            <MenuItem value="email">Email</MenuItem>
                            <MenuItem value="phone">Phone Number</MenuItem>
                        </TextField>
                        <TextField
                            required
                            id="guest-identifier"
                            label=""
                            onChange={(e) => {
                                setFormState((current) => ({
                                    ...current,
                                    guestIdentifier: e.target.value,
                                }));
                            }}
                        />
                        <Button onClick={submitJoinEvent} variant="contained">
                            Join Event
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </>
    );
};

export default JoinEventAsGuest;
