import React from "react";
import { FormControl, Grid, TextField } from "@mui/material";
import partyEventService from "../../../services/partyEventsService";
import JoinEvent from "./JoinEvent";
import JoinEventAsGuest from "./JoinEventAsGuest";

const JoinEventForm = () => {
    const handleJoin = () => {};
    return (
        <Box>
            <Grid container>
                <Grid item md={6}>
                    <JoinEvent />
                </Grid>
                <Grid item md={6}>
                    <JoinEventAsGuest />
                </Grid>
            </Grid>
        </Box>
    );
};
export default JoinEventForm;
