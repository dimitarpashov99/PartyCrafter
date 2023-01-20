import React from "react";
import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Stack,
    Typography,
} from "@mui/material";

import GuestList from "./GuestListGrid";
import LocationMap from "../location-map";
import CustomModal from "../modal";
import CommentForm from "../forms/CommentForm";

const EventPreview = (props) => {
    const eventData = props.formState;
    const showCommentForm = props?.showCommentForm || false;
    const [eventImage, setImage] = useState();
    const [commentModalOpen, setCommentModalOpen] = useState(false);
    const { musicPlaylist, foodMenu } = eventData;
    const locationCoorinates = { lat: 48.8584, lng: 2.2945 };

    useEffect(() => {
        if (!eventData.eventImage) {
            setImage(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(eventData.eventImage);
        setImage(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [eventData]);
    return (
        <Box
            sx={{
                maxWidth: "70vw",
                marginX: "auto",
                marginY: 5,
                color: "text.primary",
            }}
        >
            <Stack spacing={2}>
                <Box
                    sx={{
                        height: "100%",
                        padding: 4,
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        border: "3px solid",
                        borderRadius: "12px",
                        borderColor: "primary.main",
                    }}
                >
                    <Typography variant="h6" color="primary">
                        Event info
                    </Typography>
                    <Box>
                        <Grid container>
                            <Grid item md={6} sx={{ textAlign: "center" }}>
                                <Stack spacing={1} sx={{ textAlign: "start" }}>
                                    <Typography variant="body1" color="primary">
                                        Party Title: {"\n"} {eventData.title}
                                    </Typography>
                                    <Typography variant="body1" color="primary">
                                        Date:{" "}
                                        {new Date(
                                            eventData.date
                                        ).toLocaleString()}
                                    </Typography>
                                    <Typography variant="body1" color="primary">
                                        Access:{" "}
                                        {eventData.privateAccess
                                            ? "Private"
                                            : "Public"}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item md={6}>
                                {eventImage && (
                                    <Box
                                        sx={{
                                            border: "3px solid",
                                            borderColor: "primary.main",
                                            borderRadius: "12px",
                                        }}
                                    >
                                        <img
                                            className="preview-img"
                                            src={eventImage}
                                            alt=""
                                        />
                                    </Box>
                                )}
                            </Grid>
                            <Grid item>
                                {eventData.description && (
                                    <React.Fragment>
                                        <Typography
                                            variant="body1"
                                            color="primary"
                                        >
                                            Description:
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="primary"
                                        >
                                            {eventData.description}
                                        </Typography>
                                    </React.Fragment>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box
                    sx={{
                        height: "100%",
                        padding: 2,
                        display: "flex",
                        justifyContent: "start",
                        alignContent: "start",
                        flexDirection: "column",
                        border: "3px solid",
                        borderRadius: "12px",
                        borderColor: "primary.main",
                    }}
                >
                    <Typography variant="h6" color="primary">
                        Location
                    </Typography>
                    {eventData.address ? (
                        <Grid container columns={12} spacing={2}>
                            <Grid item md={6}>
                                <Stack direction="column">
                                    <Typography variant="body1" color="primary">
                                        Address: {eventData.address?.address1}
                                    </Typography>
                                    {eventData.address?.address2 && (
                                        <Typography
                                            variant="body1"
                                            color="primary"
                                        >
                                            Additional Address:{" "}
                                            {eventData.address?.address1}
                                        </Typography>
                                    )}
                                    {eventData.address?.address2 && (
                                        <Typography
                                            variant="body1"
                                            color="primary"
                                        >
                                            City: {eventData.address?.city} ,
                                            Country:{" "}
                                            {eventData.address?.country}
                                        </Typography>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item md={6} sx={{ height: 200 }}>
                                <LocationMap center={locationCoorinates} />
                            </Grid>
                        </Grid>
                    ) : (
                        <Typography variant="body" color="primary">
                            Location is not mentioned
                        </Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        height: "100%",
                        padding: 2,
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        border: "3px solid",
                        borderRadius: "12px",
                        borderColor: "primary.main",
                    }}
                >
                    <Typography variant="h6">Guest List</Typography>

                    {eventData.guestList?.length > 1 ? (
                        <Box sx={{ height: "300px" }}>
                            <GuestList
                                page="Preview"
                                guestList={eventData?.guestList}
                                tableCount={eventData?.tableCount}
                                assignGuestTables={
                                    eventData?.preferences.assignGuestTables
                                }
                            />
                        </Box>
                    ) : (
                        <Box>
                            <Typography variant="body1" color="primary">
                                No Guest invatations
                            </Typography>
                        </Box>
                    )}
                </Box>
                {(musicPlaylist || foodMenu) && (
                    <Box
                        sx={{
                            padding: 2,
                            border: "3px solid",
                            borderRadius: "12px",
                            borderColor: "primary.main",
                        }}
                    >
                        <React.Fragment>
                            <Typography variant="h6" color="primary">
                                Additional info
                            </Typography>
                            <Grid container spacing={1} sx={{ height: "100%" }}>
                                <Grid item md={6}>
                                    {musicPlaylist && (
                                        <Box
                                            sx={{
                                                padding: 2,
                                                border: "3px solid",
                                                borderColor: "#B22727",
                                                borderRadius: "12px",
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                color="primary"
                                            >
                                                Music
                                            </Typography>

                                            <Box sx={{ paddingX: 2 }}>
                                                <Card sx={{ width: "100%" }}>
                                                    <CardMedia
                                                        component="img"
                                                        alt={
                                                            musicPlaylist?.label
                                                        }
                                                        image={
                                                            musicPlaylist?.coverSrc
                                                        }
                                                        height={200}
                                                    ></CardMedia>
                                                    <CardContent>
                                                        <Typography
                                                            variant="body1"
                                                            color="primary"
                                                        >
                                                            {
                                                                musicPlaylist?.label
                                                            }
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Box>
                                        </Box>
                                    )}
                                </Grid>
                                <Grid item md={6}>
                                    {foodMenu && (
                                        <Box
                                            sx={{
                                                padding: 2,
                                                border: "3px solid",
                                                borderColor: "#EE5007",
                                                borderRadius: "12px",
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                color="primary"
                                            >
                                                Foods & Drinks
                                            </Typography>
                                        </Box>
                                    )}
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    </Box>
                )}
                {showCommentForm && (
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <Button
                            onClick={() => {
                                setCommentModalOpen(true);
                            }}
                        >
                            Leave a comment
                        </Button>
                        <CustomModal
                            isOpen={commentModalOpen}
                            onClose={() => {
                                setCommentModalOpen(false);
                            }}
                            body={<CommentForm eventId={eventData.eventId} />}
                        />
                    </Box>
                )}
            </Stack>
        </Box>
    );
};

export default EventPreview;
