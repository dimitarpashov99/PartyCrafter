import React from "react";
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { searchEventByCode } from "../../../services/partyEventsService";
import LoginForm from "../../../components/forms/Authentication/LoginForm";
const JoinEvent = () => {
    const [eventCode, setEventCode] = useState(undefined);
    const [eventCodeSubmitted, setEventCodeSubmitted] = useState(false);
    const submitJoinEvent = () => {};
    const searchEvent = () => {
        if (!eventCode) {
            searchEventByCode(eventCode).then((responseData) => {
                setEventCodeSubmitted(true);
            });
        }
    };
    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[500],
            }}
        >
            <Paper sx={{ width: { xs: "100vw", md: "80vw" }, paddingY: 5 }}>
                <Stack
                    spacing={2}
                    direction="column"
                    divider={<Divider orientation="vertical" />}
                >
                    <Box>
                        <Typography
                            color="primary.main"
                            variant="h3"
                            component="h2"
                        >
                            Join The Party
                        </Typography>
                        {!eventCodeSubmitted && (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <TextField
                                    required
                                    id="event-code"
                                    label="Party Code"
                                    name="event-code"
                                    onChange={(e) => {
                                        setEventCode(e.target.value);
                                    }}
                                    autoFocus
                                />
                                <Button
                                    onClick={searchEvent}
                                    variant="contained"
                                >
                                    Search
                                </Button>
                            </Box>
                        )}
                        {eventCodeSubmitted && (
                            <Box>
                                <Typography component="h2" variant="h3">
                                    How would you like to join the event
                                </Typography>
                                <Grid container columns={2}>
                                    <Grid item>
                                        <LoginForm />
                                    </Grid>
                                    <Grid item></Grid>
                                </Grid>
                            </Box>
                        )}
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );
};

export default JoinEvent;