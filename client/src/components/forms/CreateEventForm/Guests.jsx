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
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import GuestList from "../../partyevent/GuestListGrid";
import { AuthConsumer } from "../../../contexts";

const Guests = ({
    guestList,
    tableCount,
    assignGuestTables,
    handleGuestsChange,
    handleTableCountChange,
    handleAssignTablePrefChange,
}) => {
    const { auth } = AuthConsumer();

    const [guests, setGuests] = useState(
        guestList || [
            {
                id: uuidv4(),
                name: auth?.profile?.fullName,
                email: auth?.profile?.email,
                phone: auth?.profile?.phone,
                table: 1,
            },
        ]
    );

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

    useEffect(() => {
        handleGuestsChange(guests);
    }, [guests]);

    return (
        <React.Fragment>
            <Typography variant="h6">Guest List:</Typography>
            <Typography variant="body1">Add a guest to your party:</Typography>
            <Stack
                direction="row"
                spacing={2}
                sx={{
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
                            checked={assignGuestTables}
                            onChange={(e) => {
                                handleAssignTablePrefChange(e.target.checked);
                            }}
                        />
                    }
                    label="Assign guest tables"
                />
                {assignGuestTables && (
                    <React.Fragment>
                        <TextField
                            type="number"
                            name="table_count"
                            label="Table Count"
                            variant="filled"
                            value={tableCount}
                            inputProps={{ min: 1 }}
                            onChange={(event) => {
                                if (event.target.value > 0)
                                    handleTableCountChange(event.target.value);
                            }}
                        />
                    </React.Fragment>
                )}
            </Box>

            <Box sx={{ padding: 5, height: "400px" }}>
                <GuestList
                    page="CreateEvent"
                    guestList={guests}
                    tableCount={tableCount}
                    assignGuestTables={assignGuestTables}
                    handleTableChange={handleGuestsChange}
                />
            </Box>
        </React.Fragment>
    );
};
export default Guests;
