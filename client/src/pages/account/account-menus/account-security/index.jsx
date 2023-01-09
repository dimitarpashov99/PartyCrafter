import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";

const AccountSecurity = () => {
    const [formValues, setValues] = useState({});
    const handleChangePassword = (e) => {
        e.preventDefault();
    };
    return (
        <Paper>
            <Stack direction="column" spacing={3}>
                <Typography component="h3" variant="h3">
                    Change Password
                </Typography>
                <TextField
                    onChange={(e) => {
                        setValues((current) => ({
                            ...current,
                            oldPassword: e.target.value,
                        }));
                    }}
                    label="Old Password"
                ></TextField>
                <TextField
                    onChange={(e) => {
                        setValues((current) => ({
                            ...current,
                            newPassword: e.target.value,
                        }));
                    }}
                    label="New Password"
                />
                <TextField
                    onChange={(e) => {
                        setValues((current) => ({
                            ...current,
                            newPassowordConfirm: e.target.value,
                        }));
                    }}
                    label="Confirm New Password"
                />
                <Button variant="contained" onClick={handleChangePassword}>
                    Change
                </Button>
            </Stack>
        </Paper>
    );
};

export default AccountSecurity;
