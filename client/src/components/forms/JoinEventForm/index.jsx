import React from "react";
import { Box, FormControl, Grid, TextField } from "@mui/material";
import JoinEvent from "./JoinEvent";
import JoinEventAsGuest from "./JoinEventAsGuest";
import partyEventService from "../../../services/partyEventsService";
import { useNavigate } from "react-router";

const JoinEventForm = () => {
    const navigate = useNavigate();
    const handleJoinEvent = (data) => {
        if (data.success) {
            navigate(`/events/preview/${data.eventCode}`);
        }
    };
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item md={6}>
                    <JoinEvent handleJoinEvent={handleJoinEvent} />
                </Grid>
                <Grid item md={6} sx={{ display: "flex" }}>
                    <JoinEventAsGuest handleJoinEvent={handleJoinEvent} />
                </Grid>
            </Grid>
        </Box>
    );
};
export default JoinEventForm;
