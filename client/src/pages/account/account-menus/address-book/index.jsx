import { Paper, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";

const Address = (props) => {
    const { data } = props;
    return <Box> </Box>;
};

const AddressBook = () => {
    const [addresses, setAddresses] = useState([]);
    return (
        <Paper>
            <Grid container>
                <Grid item>
                    {addresses?.map((address) => {
                        <Address data={address} />;
                    })}
                </Grid>
                <Grid item>
                    
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AccountSecurity;
