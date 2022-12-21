import React, { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    Box,
    Button,
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
    const userAddressBook = props.userAddressBook;
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
    const [eventAddress, setEventAddress] = useState(
        formState.eventAddress || {}
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
            clearNewGuestInput();
        }
    };

    const handleTableChange = (guestList) => {
        setFormState({ ...formState, guestList: guestList });
    };

    const handleAddressChange = (e) => {
        const chosenAddressBook =
            e.target.value && e.target.value !== "new"
                ? userAddressBook.find((address) => {
                      return e.target.value === address.name;
                  })
                : undefined;
        if (chosenAddressBook) {
            setEventAddress(chosenAddressBook);
        }
    };
    useEffect(() => {
        handleFormChange(formState);
    }, [formState, handleFormChange]);
    useEffect(() => {
        setFormState((current) => ({ ...current, guestList: guests }));
    }, [guests]);
    useEffect(() => {
        setFormState((current) => ({ ...current, eventAddress: eventAddress }));
    }, [eventAddress]);
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
                            <Stack direction="column" spacing={2}>
                                <FormControl>
                                    <Select
                                        value={
                                            userAddressBook &&
                                            userAddressBook?.length
                                                ? userAddressBook[0]
                                                : "new"
                                        }
                                        displayEmpty
                                        onChange={handleAddressChange}
                                    >
                                        <MenuItem value="new">
                                            New Address
                                        </MenuItem>
                                        {userAddressBook?.map(
                                            (address, index) => (
                                                <MenuItem
                                                    value={address.name}
                                                    key={index}
                                                />
                                            )
                                        )}
                                    </Select>
                                </FormControl>
                                <TextField
                                    id="event-address-address1"
                                    name="event-address-address1"
                                    label="Event address"
                                    required
                                    fullWidth
                                    autoComplete="off"
                                    value={formState?.eventAddress?.address1}
                                    onChange={(e) => {
                                        setEventAddress({
                                            ...eventAddress,
                                            address1: e.target.value,
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
                                    value={eventAddress?.address2}
                                    onChange={(e) => {
                                        setEventAddress({
                                            ...eventAddress,
                                            address2: e.target.value,
                                        });
                                    }}
                                />
                                <TextField
                                    id="event-address"
                                    name="event-address-city"
                                    label="City"
                                    required
                                    fullWidth
                                    autoComplete="off"
                                    value={eventAddress?.city}
                                    onChange={(e) => {
                                        setEventAddress({
                                            ...eventAddress,
                                            city: e.target.value,
                                        });
                                    }}
                                />
                            </Stack>
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
                                    setFormState((current) => ({
                                        ...current,
                                        preferences: {
                                            ...current.preferences,
                                            assignGuestTables: e.target.checked,
                                        },
                                    }));
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
                                        setFormState((current) => ({
                                            ...current,
                                            tableCount: event.target.value,
                                        }));
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