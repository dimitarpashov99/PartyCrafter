import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    List,
    Typography,
} from "@mui/material";
import partyEventsService from "../../../../services/partyEventsService";
import PartyEventsCalendar from "../../../../components/party-events-calendar";
import { AuthConsumer } from "../../../../contexts";

const UserEvents = () => {
    const [userPartyEvents, setUserPartyEvents] = useState(undefined);
    const { auth } = AuthConsumer();
    useEffect(() => {
        if (!userPartyEvents) {
            partyEventsService
                .getUserEvents(auth.profile.id)
                .then((response) => {
                    setUserPartyEvents(response.data);
                });
        }
    });
    return (
        <Box>
            <Typography component="h3" variant="h5">
                Your Events
            </Typography>
            <Grid container>
                <Grid item xs={12} md={6} sx={{ overflowY: "scroll" }}>
                    {userPartyEvents && userPartyEvents.length ? (
                        <List>
                            {userPartyEvents?.map((partyEvent) => (
                                <Card key={partyEvent._id}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="30"
                                            image={partyEvent.imageURL}
                                            alt="Event Image"
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                            >
                                                {partyEvent.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Date:{" "}
                                                {new Date(
                                                    partyEvent.date
                                                ).toLocaleString()}
                                            </Typography>
                                            <CardActions>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                >
                                                    Preview
                                                </Button>
                                            </CardActions>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            ))}
                        </List>
                    ) : (
                        <Box>No Events found</Box>
                    )}
                </Grid>
                <Grid item xs={12} md={6}>
                    <PartyEventsCalendar events={userPartyEvents} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserEvents;
