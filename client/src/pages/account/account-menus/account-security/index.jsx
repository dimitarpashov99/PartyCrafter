import { Paper, Button, TextField, Typography, Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import accountService from "../../../../services/accountService";

const AccountSecurity = () => {
    const [formValues, setValues] = useState({});
    const [passwordChanged, setPasswordChanged] = useState(false);
    const submitChangePassword = (e) => {
        e.preventDefault();
        const result = accountService.changePassword(formValues);
        if (result) {
            setPasswordChanged(true);
        }
    };
    return (
        <Paper>
            <Stack direction="column" spacing={3}>
                <Typography component="h3" variant="h3">
                    Change Password
                </Typography>
                {!changePassword ? (
                    <Box>
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
                        <Button
                            variant="contained"
                            onClick={submitChangePassword}
                        >
                            Change
                        </Button>
                    </Box>
                ) : (
                    <Box></Box>
                )}
            </Stack>
        </Paper>
    );
};

export default AccountSecurity;
