import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
} from "@mui/material";
import React, { useState, useRef } from "react";
import partyEventsSevice from "../../../services/partyEventsService";
import CustomizedAlert from "../../alert";

const JoinEventAsGuest = ({ handleJoinEvent }) => {
    const [formState, setFormState] = useState({
        eventCode: undefined,
        guestIdentifier: undefined,
        guestIdentifierType: "name",
    });
    const [alert, setAlert] = useState({ open: false });
    const submitJoinEvent = async () => {
        const result = await partyEventsSevice.joinEvent(formState);
        if (!result || result.data.error) {
            return setAlert({
                open: true,
                type: error,
                title: result.title,
                message: result.message,
            });
        }
        if (result.data.accessToken) {
            localStorage.setItem("access_token", result?.accessToken);
        }
        handleJoinEvent(result.data);
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
                                    eventCode: e.target.value,
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
