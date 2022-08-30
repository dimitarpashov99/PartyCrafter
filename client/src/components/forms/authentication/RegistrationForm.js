import React from "react";
import {
    Avatar,
    Box,
    Button,
    Grid,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AuthService from "../../../services/authService";

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: null,
            lastname: null,
            email: null,
            password: null,
            success: false,
            successMsg: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        AuthService.register(formData).then((response) => {
            if (response.status === 1) {
                this.setState({ success: true });
                this.setState({ successMsg: response.message });
            }
        });
    };
    render() {
        return (
            <Box sx={{ backgroundColor: "background.default", height: "100%" }}>
                <Box
                    sx={{
                        paddingTop: 8,
                        paddingBottom: 15,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {!this.state.success && (
                        <React.Fragment>
                            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                                <LockOutlined />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={this.handleSubmit}
                                sx={{ mt: 3, marginX: 16 }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="firstname"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastname"
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Confirm Password"
                                            type="password"
                                            id="confirm-password"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </React.Fragment>
                    )}

                    {this.state.successMsg && (
                        <React.Fragment>
                            <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
                                <CheckCircleOutlineIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                {this.state.successMsg}
                            </Typography>
                            <Link href="/login" variant="body2">
                                Continue to Sign in
                            </Link>
                        </React.Fragment>
                    )}
                </Box>
            </Box>
        );
    }
}
