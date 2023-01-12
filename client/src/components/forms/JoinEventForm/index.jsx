import React from "react";
import { Box, FormControl, Grid, TextField } from "@mui/material";
import JoinEvent from "./JoinEvent";
import JoinEventAsGuest from "./JoinEventAsGuest";
import partyEventService from "../../../services/partyEventsService";

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
