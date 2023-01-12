import { Grid, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { AuthConsumer } from "../../../../contexts";
const Profile = () => {
    const { auth } = AuthConsumer();
    return (
        <Paper>
            <Typography component="h3" variant="h5">
                Your profile
            </Typography>
            <Grid container>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <Stack direction="column" spacing={3}>
                        <Paper>First name: {auth?.profile?.firstName}</Paper>
                        <Paper>Last name: {auth?.profile?.lastName}</Paper>
                        <Paper>Email: {auth?.profile?.lastName}</Paper>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Profile;
