import React, { useState } from "react";
import {
    Paper,
    Grid,
    Typography,
    Box,
    List,
    ListItemText,
    ListItemButton,
} from "@mui/material";
import { getAddressBook } from "../../../../services/addressBookService";
import LocationMap from "../../../../components/location-map";
import { useEffect } from "react";
import { AuthConsumer } from "../../../../contexts";

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
    const { auth } = AuthConsumer();
    const [addresses, setAddresses] = useState(undefined);
    const [selected, setSelected] = useState(undefined);

    useEffect(() => {
        if (!addresses) {
            console.log(auth.profile);
            getAddressBook(auth.profile?.id)
                .then((response) => {
                    if (response.data) {
                        setAddresses(response.data.addresses);
                    } else {
                        setAddresses([]);
                    }
                })
                .catch(() => {
                    setAddresses([]);
                });
        }
    });
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
