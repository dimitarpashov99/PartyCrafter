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
import partyEventsService from "../../../services/partyEventsService";
import LoginForm from "../../../components/forms/Authentication/LoginForm";
import JoinEventForm from "../../../components/forms/JoinEventForm";

const JoinEvent = () => {
    const [eventCodeSubmitted, setEventCodeSubmitted] = useState(false);
    const searchEvent = async () => {
        if (eventCode) {
            const response = partyEventsService.searchEventByCode(eventCode);
            if (response.success) {
                setEventCodeSubmitted(true);
            }
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
                        <Typography
                            color="primary.main"
                            variant="h3"
                            component="h2"
                        >
                            How would you like to join the party
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <JoinEventForm />
                        </Box>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );
};

export default JoinEvent;
