import React, { useState } from "react";
import {
    Paper,
    Grid,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
} from "@mui/material";
import LocationMap from "../../../../components/location-map";

const Address = (props) => {
    const { data, active, onSelect } = props;

    return (
        <ListItemButton
            selected={active}
            onClick={() => {
                onSelect(data.id);
            }}
        >
            <ListItemText primary={data.name} />
        </ListItemButton>
    );
};

const AddressBook = () => {
    const [addresses, setAddresses] = useState([]);
    const [selected, setSelected] = useState(undefined);

    return (
        <Paper>
            <Typography component="h3" variant="h5">
                Address Book
            </Typography>
            {addresses?.length ? (
                <Grid container>
                    <Grid item>
                        <List>
                            {addresses?.map((address) => {
                                <Address
                                    data={address}
                                    active={selected === address.id}
                                    onSelect={(addressId) => {
                                        setSelected(addressId);
                                    }}
                                />;
                            })}
                        </List>
                    </Grid>
                    <Grid item direction="column">
                        <LocationMap
                            center={{ lat: address?.lat, lng: address?.lng }}
                        />
                    </Grid>
                </Grid>
            ) : (
                <Box>No addresses saved</Box>
            )}
        </Paper>
    );
};

export default AddressBook;
