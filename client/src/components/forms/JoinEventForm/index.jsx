import React from "react";
import { Box, Grid } from "@mui/material";
import JoinEvent from "./JoinEvent";
import JoinEventAsGuest from "./JoinEventAsGuest";
import { useNavigate } from "react-router";

const JoinEventForm = () => {
    const navigate = useNavigate();
    const handleJoinEvent = (data) => {
        if (data.eventId) {
            navigate(`/events/preview/${data.eventId}`);
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
