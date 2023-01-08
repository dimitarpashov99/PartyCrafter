import React, { useState, useEffect } from "react";
import {
    Box,
    Stack,
    FormControl,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

const Location = (props) => {
    const [address, setAddress] = useState(props.address || {});

    const userAddressBook = props?.userAddressBook;
    const handleLocationChange = props?.handleLocationChange;

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: 'AIzaSyD3DFJdrc6s8YMh9FXRU7ekVkN8lXFdWiI',
        libraries: ["places"],
    });

    const center = { lat: 42.7, lng: 23.33 };
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));

    useEffect(() => {
        handleLocationChange(address);
    }, [address]);

    const handleAddressSelect = (e) => {
        const chosenAddressBook =
            e.target.value && e.target.value !== "new"
                ? userAddressBook?.find((address) => {
                      return e.target.value === address.name;
                  })
                : undefined;
        if (chosenAddressBook) {
            setAddress(chosenAddressBook);
        }
    };
    return (
        <React.Fragment>
            <Typography variant="h6">Location:</Typography>
            <Stack direction="row" spacing={2}>
                <Box sx={{ minWidth: 400 }}>
                    <Stack direction="column" spacing={2}>
                        <FormControl>
                            <Select
                                value={
                                    userAddressBook && userAddressBook?.length
                                        ? userAddressBook[0]
                                        : "new"
                                }
                                displayEmpty
                                onChange={handleAddressSelect}
                            >
                                <MenuItem value="new">New Address</MenuItem>
                                {userAddressBook?.map((address, index) => (
                                    <MenuItem
                                        value={address.name}
                                        key={index}
                                    />
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            id="event-address-address1"
                            name="event-address-address1"
                            label="Event address"
                            required
                            fullWidth
                            autoComplete="off"
                            value={address?.address1}
                            onChange={(e) => {
                                setAddress({
                                    ...address,
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
                            value={address?.address2}
                            onChange={(e) => {
                                setAddress({
                                    ...address,
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
                            value={address?.city}
                            onChange={(e) => {
                                setAddress({
                                    ...address,
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
        </React.Fragment>
    );
};
export default Location;
