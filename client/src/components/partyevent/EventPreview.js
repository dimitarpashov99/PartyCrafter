import React from "react";
import { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Stack,
    Typography,
} from "@mui/material";

import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

import GuestList from "./GuestListGrid";
const libraries = ["places"];

const EventPreview = (props) => {
    const eventData = props.formState;
    const [eventImage, setImage] = useState();
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const { chosenPlaylist, chosenFoodMenu } = eventData;
    const locationCoorinates = { lat: 48.8584, lng: 2.2945 };
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });
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
        <Box sx={{ maxWidth: "70vw", marginX: "auto", marginY: 5 }}>
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
                    <Typography variant="h6">Event info</Typography>
                    <Box>
                        <Grid container>
                            <Grid item md={6} sx={{ textAlign: "center" }}>
                                <Stack spacing={1} sx={{ textAlign: "start" }}>
                                    <Typography variant="body1">
                                        Party Title: {"\n"} {eventData.title}
                                    </Typography>
                                    <Typography variant="body1">
                                        Date:{" "}
                                        {eventData.startingDate.toLocaleString()}
                                    </Typography>
                                    <Typography variant="body1">
                                        Access:{" "}
                                        {eventData.privateEvent
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
                                        <Typography variant="body1">
                                            Description:
                                        </Typography>
                                        <Typography variant="body1">
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
                    <Typography variant="h6">Location</Typography>
                    {eventData.address ? (
                        <Grid container columns={12} spacing={2}>
                            <Grid item md={6}>
                                <Stack direction="column">
                                    <Typography variant="body1">
                                        Address: {eventData.address?.address1}
                                    </Typography>
                                    {eventData.address?.address2 && (
                                        <Typography variant="body1">
                                            Additional Address:{" "}
                                            {eventData.address?.address1}
                                        </Typography>
                                    )}
                                    {eventData.address?.address2 && (
                                        <Typography variant="body1">
                                            City: {eventData.address?.city} ,
                                            Country:{" "}
                                            {eventData.address?.country}
                                        </Typography>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item md={6} sx={{ height: 200 }}>
                                {isLoaded && (
                                    <GoogleMap
                                        state={map}
                                        center={locationCoorinates}
                                        zoom={15}
                                        mapContainerStyle={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        options={{
                                            zoomControl: false,
                                            streetViewControl: false,
                                            mapTypeControl: false,
                                            fullscreenControl: false,
                                        }}
                                        onLoad={(map) => setMap(map)}
                                    ></GoogleMap>
                                )}
                            </Grid>
                        </Grid>
                    ) : (
                        <Typography variant="body">
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
                            <Typography variant="body1">
                                No Guest invatations
                            </Typography>
                        </Box>
                    )}
                </Box>
                {(chosenPlaylist || chosenFoodMenu) && (
                    <Box
                        sx={{
                            padding: 2,
                            border: "3px solid",
                            borderRadius: "12px",
                            borderColor: "primary.main",
                        }}
                    >
                        <React.Fragment>
                            <Typography variant="h6">
                                Additional info
                            </Typography>
                            <Grid container spacing={1} sx={{ height: "100%" }}>
                                <Grid item md={6}>
                                    {chosenPlaylist && (
                                        <Box
                                            sx={{
                                                padding: 2,
                                                border: "3px solid",
                                                borderColor: "#B22727",
                                                borderRadius: "12px",
                                            }}
                                        >
                                            <Typography variant="body1">
                                                Music
                                            </Typography>

                                            <Box sx={{ paddingX: 2 }}>
                                                <Card sx={{ width: "100%" }}>
                                                    <CardMedia
                                                        component="img"
                                                        alt={
                                                            chosenPlaylist?.label
                                                        }
                                                        image={
                                                            chosenPlaylist?.coverSrc
                                                        }
                                                        height={200}
                                                    ></CardMedia>
                                                    <CardContent>
                                                        <Typography variant="body1">
                                                            {
                                                                chosenPlaylist?.label
                                                            }
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Box>
                                        </Box>
                                    )}
                                </Grid>
                                <Grid item md={6}>
                                    {chosenFoodMenu && (
                                        <Box
                                            sx={{
                                                padding: 2,
                                                border: "3px solid",
                                                borderColor: "#EE5007",
                                                borderRadius: "12px",
                                            }}
                                        >
                                            <Typography variant="body1">
                                                Foods & Drinks
                                            </Typography>
                                        </Box>
                                    )}
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    </Box>
                )}
            </Stack>
        </Box>
    );
};

export default EventPreview;
