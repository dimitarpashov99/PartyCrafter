import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import React, { useState } from "react";

const JoinEventAsGuest = ({ handleJoinEvent }) => {
    const [formState, setFormState] = useState({
        eventCode: undefined,
        guestIdentifier: undefined,
        guestIdentifierType: "name",
    });
    return (
        <>
            <Box component="form">
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
                <Button onClick={searchEvent} variant="contained">
                    Join using code
                </Button>
            </Box>
            ;
        </>
    );
};

export default JoinEventAsGuest;
