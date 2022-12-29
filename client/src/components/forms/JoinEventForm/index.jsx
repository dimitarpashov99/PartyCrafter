import React from "react";
import { FormControl, Grid, TextField } from "@mui/material";
import partyEventService from "../../../services/partyEventsService";

const JoinEventForm = () => {
    const handleJoinAsGuest = () => {
        partyEventService.
    };
    const handleJoinAsUser = () => {

    };
    return (
        <Box>
            <Grid container>
                <Grid item md={6}>
                    <Box component="form">
                        <FormControl>
                            <TextField id="join-as-guest"></TextField>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item md={6}>
                    <Box component="form">
                        <FormControl>
                            <TextField id="join-as-user"></TextField>
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
export default JoinEventForm;
