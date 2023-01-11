import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import PartyEventsCalendar from "../../../../components/party-events-calendar";

const UserEvents = () => {
    const [userPartyEvents, setUserPartyEvents] = useState([]);

    return (
        <Box>
            <Typography component="h3" variant="h5">
                Your Events
            </Typography>
            <Grid container>
                <Grid item xs={12} md={6}></Grid>
                <Grid item xs={12} md={6}>
                    <PartyEventsCalendar partyEvents={userPartyEvents} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserEvents;
