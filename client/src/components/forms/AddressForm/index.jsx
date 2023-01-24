import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const AddressForm = (props) => {
    const { handleAddressChange } = props;
    const [address, setAddress] = useState(props.address);

    useEffect(() => {
        handleAddressChange(address);
    }, [address]);

    return (
        <React.Fragment>
            <TextField
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
        </React.Fragment>
    );
};

export default AddressForm;
