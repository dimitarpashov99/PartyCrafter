import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Stack } from "@mui/material";
import Location from "./Location";
import Guests from "./Guests";

const StepTwo = (props) => {
    const [formState, setFormState] = useState(props.formState);
    const handleFormChange = props.handleFormChange;

    useEffect(() => {
        handleFormChange(formState);
    }, [formState, handleFormChange]);

    const handleLocationChange = (address) => {
        setFormState((current) => ({ ...current, address: address }));
    };

    const handleGuestsChange = (guests) => {
        setFormState((current) => ({ ...current, guestList: guests }));
    };

    const handleTableChange = (guestList) => {
        setFormState((current) => ({ ...current, guestList: guestList }));
    };

    const handleAssignTablePrefChange = (value) => {
        setFormState((current) => ({
            ...current,
            preferences: {
                ...current.preferences,
                assignGuestTables: value,
            },
        }));
    };
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
                    <Location
                        address={formState?.address}
                        userAddressBook={[]}
                        handleLocationChange={handleLocationChange}
                    />
                </Box>
                <Box>
                    <Guests
                        guestList={formState?.guestList}
                        assignGuestTables={
                            formState?.preferences.assignGuestTables
                        }
                        tableCount={formState?.tableCount}
                        handleGuestsChange={handleGuestsChange}
                        handleTableChange={handleTableChange}
                        handleAssignTablePrefChange={
                            handleAssignTablePrefChange
                        }
                    />
                </Box>
            </Stack>
        </React.Fragment>
    );
};

export { StepTwo };
