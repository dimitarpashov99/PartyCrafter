import React, { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    Box,
    Button,
    Grid,
    FormControlLabel,
    Switch,
    Typography,
    TextField,
} from "@mui/material";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import GuestList from "../../partyevent/GuestListGrid";

function StepTwo(props) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });
    const center = { lat: 42.70, lng: 23.33 };
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [formState, setFormState] = useState(props.formState);
    const guests = formState.guestList || [
        {
            id: uuidv4(),
            name: "Host",
            email: "partyhost@mail.com",
            phone: "+359 999 9999",
            table: 1,
        },
    ];
    const handleFormChange = props.handleFormChange;
    const [newGuest, setNewGuest] = React.useState({
        id: uuidv4(),
        name: "",
        email: "",
        phone: "",
    });
    const handleAddGuest = () => {
        if (newGuest.name !== "") {
            setFormState({ ...formState, guestList: [...formState.guestList, newGuest] });
            setNewGuest({
                id: formState.guestList.length + 1,
                name: "",
                email: "",
                phone: "",
            });
        }
    };

    const handleTableChange = (guestList) => {
        setFormState({ ...formState, guestList: guestList });
    };

    useEffect(() => {
        handleFormChange(formState);
    }, [formState, handleFormChange]);

    return (
        <React.Fragment>
            <Grid container>
                <Grid item md={12} sx={{ width: "100%", padding: 5 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Typography variant="h6">Location:</Typography>

                        {/* <Autocomplete> */}
                        <TextField
                            id="event-address"
                            name="event-address"
                            label="Event address"
                            margin="normal"
                            required
                            fullWidth
                            autoComplete="off"
                            value={formState.eventAddress}
                            onChange={(e) => {
                                setFormState({
                                    ...formState,
                                    eventAddress: e.target.value,
                                });
                            }}
                        />
                        {/* </Autocomplete> */}
                        <Box sx={{ width: "100%", height: 300 }}>
                            {isLoaded && (
                                <GoogleMap
                                    state={map}
                                    center={center}
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
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Guest List:</Typography>
                </Grid>
                <Grid item md={4}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            padding: 5,
                            paddingRight: 0,
                        }}
                    >
                        <Typography variant="body1">
                            Add a guest to your party:
                        </Typography>
                        <Grid container sx={{ justifyContent: "center" }}>
                            <Grid
                                item
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <TextField
                                    id="event-guestinput-name"
                                    margin="normal"
                                    fullWidth
                                    label="Guest Name"
                                    value={newGuest.name}
                                    onChange={(e) => {
                                        setNewGuest({
                                            ...newGuest,
                                            name: e.target.value,
                                        });
                                    }}
                                />
                                <TextField
                                    id="event-guestinput-email"
                                    margin="normal"
                                    fullWidth
                                    label="Guest Email"
                                    value={newGuest.email}
                                    onChange={(e) => {
                                        setNewGuest({
                                            ...newGuest,
                                            email: e.target.value,
                                        });
                                    }}
                                />
                                <TextField
                                    id="event-guestinput-phone"
                                    margin="normal"
                                    fullWidth
                                    label="Guest Phone"
                                    value={newGuest.phone}
                                    onChange={(e) => {
                                        setNewGuest({
                                            ...newGuest,
                                            phone: e.target.value,
                                        });
                                    }}
                                />
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    paddingY: { xs: 0, md: 1 },
                                }}
                            >
                                <Button
                                    onClick={handleAddGuest}
                                    variant="contained"
                                    sx={{
                                        width: "100% ",
                                        height: "100%",
                                    }}
                                >
                                    <AddCircleOutlineIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={
                                        formState.preferences.assignGuestTables
                                    }
                                    onChange={(e) => {
                                        setFormState({
                                            ...formState,
                                            preferences: {
                                                ...formState.preferences,
                                                assignGuestTables:
                                                    e.target.checked,
                                            },
                                        });
                                    }}
                                />
                            }
                            label="Assign guest tables"
                        />
                        {formState.preferences.assignGuestTables && (
                            <React.Fragment>
                                <TextField
                                    type="number"
                                    name="table_count"
                                    label="Table Count"
                                    variant="filled"
                                    value={formState.tableCount}
                                    inputProps={{ min: 1 }}
                                    onChange={(event) => {
                                        if (event.target.value > 0)
                                            setFormState({
                                                ...formState,
                                                tableCount: event.target.value,
                                            });
                                    }}
                                />
                            </React.Fragment>
                        )}
                    </Box>
                </Grid>
                <Grid
                    item
                    md={8}
                    sx={{ padding: 5, paddingBottom: 0, width: "100%" }}
                >
                    <Box sx={{ height: "100%" }}>
                        <GuestList
                            page="CreateEvent"
                            eventData={formState}
                            guestList={guests}
                            handleTableChange={handleTableChange}
                        />
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export { StepTwo };
