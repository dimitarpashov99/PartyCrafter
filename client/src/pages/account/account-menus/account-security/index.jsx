import {
    Paper,
    Button,
    Stack,
    TextField,
    Typography,
    Box,
    Alert,
    AlertTitle,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import accountService from "../../../../services/accountService";

const AccountSecurity = () => {
    const [formValues, setValues] = useState({});
    const [passwordChanged, setPasswordChanged] = useState(false);
    const submitChangePassword = async (e) => {
        e.preventDefault();
        const result = await accountService.changePassword(formValues);
        if (result) {
            setPasswordChanged(true);
        }
    };
    return (
        <Paper>
            <Stack direction="column" spacing={3}>
                <Typography component="h3" variant="h5">
                    Account security
                </Typography>
                {!passwordChanged ? (
                    <Box>
                        <Stack direction="column">
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
                                sx={{ width: "100%" }}
                                variant="contained"
                                onClick={submitChangePassword}
                            >
                                Change
                            </Button>
                        </Stack>
                    </Box>
                ) : (
                    <Box>
                        <Alert severity="success">
                            <AlertTitle>
                                Password changed successfuly
                            </AlertTitle>
                        </Alert>
                    </Box>
                )}
            </Stack>
        </Paper>
    );
};

export default AccountSecurity;
