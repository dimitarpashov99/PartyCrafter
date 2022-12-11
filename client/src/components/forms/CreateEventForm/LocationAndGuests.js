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
    Stack,
    FormControl,
    Select,
    MenuItem,
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
    const center = { lat: 42.7, lng: 23.33 };
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [formState, setFormState] = useState(props.formState);
    const [guests, setGuests] = useState(
        formState.guestList || [
            {
                id: uuidv4(),
                name: "Host",
                email: "partyhost@mail.com",
                phone: "+359 999 9999",
                table: 1,
            },
        ]
    );
    const handleFormChange = props.handleFormChange;
    const [newGuest, setNewGuest] = React.useState({
        id: uuidv4(),
        name: "",
        email: "",
        phone: "",
    });
    const clearNewGuestInput = () => {
        setNewGuest({
            id: uuidv4(),
            name: "",
            email: "",
            phone: "",
        });
    };
    const handleAddGuest = () => {
        if (newGuest.name !== "") {
            setGuests((list) => [...list, newGuest]);
            setFormState({ ...formState, guestList: guests });
            clearNewGuestInput();
        }
    };

    const handleTableChange = (guestList) => {
        setFormState({ ...formState, guestList: guestList });
    };

    const handleAddressChange = (e) => {};
    useEffect(() => {
        handleFormChange(formState);
    }, [formState, handleFormChange]);

    return (
        <React.Fragment>
            <Stack direction="column">
                <Box
                    sx={{
                        padding: 5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h6">Location:</Typography>
                    <Stack direction="row" spacing={2}>
                        <Box sx={{ minWidth: 400 }}>
                            <FormControl>
                                <Select displayEmpty onChange={handleAddressChange}>
                                    <MenuItem value="new">New Address</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                id="event-address-address1"
                                name="event-address-address1"
                                label="Event address"
                                required
                                fullWidth
                                autoComplete="off"
                                value={formState.eventAddress.address1}
                                onChange={(e) => {
                                    setFormState({
                                        ...formState,
                                        eventAddress: {
                                            ...formState.eventAddress,
                                            address1: e.target.value,
                                        },
                                    });
                                }}
                            />
                            <TextField
                                id="event-address-address2"
                                name="event-address-address2"
                                label="Additional address"
                                required
                                fullWidth
                                autoComplete="off"
                                value={formState.eventAddress.address2}
                                onChange={(e) => {
                                    setFormState({
                                        ...formState,
                                        eventAddress: {
                                            ...formState.eventAddress,
                                            address2: e.target.value,
                                        },
                                    });
                                }}
                            />
                            <TextField
                                id="event-address"
                                name="event-address-city"
                                label="Event address"
                                required
                                fullWidth
                                autoComplete="off"
                                value={formState.eventAddress.city}
                                onChange={(e) => {
                                    setFormState({
                                        ...formState,
                                        eventAddress: {
                                            ...formState.eventAddress,
                                            city: e.target.value,
                                        },
                                    });
                                }}
                            />
                        </Box>
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
                    </Stack>
                </Box>
                <Typography variant="h6">Guest List:</Typography>
                <Typography variant="body1">
                    Add a guest to your party:
                </Typography>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        // display: "flex",
                        // flexDirection: "row",
                        padding: 5,
                    }}
                >
                    <TextField
                        id="event-guestinput-name"
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

                    <Button
                        onClick={handleAddGuest}
                        variant="contained"
                        sx={{
                            width: "32px",
                        }}
                    >
                        <AddCircleOutlineIcon />
                    </Button>
                </Stack>
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
                                            assignGuestTables: e.target.checked,
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

                <Box sx={{ padding: 5, height: "400px" }}>
                    <GuestList
                        page="CreateEvent"
                        eventData={formState}
                        guestList={guests}
                        handleTableChange={handleTableChange}
                    />
                </Box>
            </Stack>
        </React.Fragment>
    );
}

export { StepTwo };
