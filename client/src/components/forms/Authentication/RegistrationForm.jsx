import React from "react";
import {
    Avatar,
    Box,
    Button,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LockOutlined } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AuthService from "../../../services/authService";

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            confirmPassword: null,
            success: false,
            successMsg: null,
            alert: false,
            alertMsg: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
    }

    toggleAlert = (message) => {
        this.setState({ alert: true, alertMsg: message });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
            const formData = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            };
            AuthService.register(formData).then((response) => {
                if (response) {
                    this.setState({ success: true });
                    this.setState({ successMsg: "User registered successfuly" });
                }
            });
        } else {
            this.toggleAlert("Password confirmation must match");
        }
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
                                            onChange={(e) => {
                                                this.setState({
                                                    firstName: e.target.value,
                                                });
                                            }}
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
                                            onChange={(e) => {
                                                this.setState({
                                                    lastName: e.target.value,
                                                });
                                            }}
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
                                            onChange={(e) => {
                                                this.setState({
                                                    email: e.target.value,
                                                });
                                            }}
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
                                            onChange={(e) => {
                                                this.setState({
                                                    password: e.target.value,
                                                });
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Confirm Password"
                                            type="password"
                                            id="confirm-password"
                                            onChange={(e) => {
                                                this.setState({
                                                    confirmPassword:
                                                        e.target.value,
                                                });
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={this.handleSubmit}
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link to="/login">
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
                            <Link to="/login" variant="body2">
                                Continue to Sign in
                            </Link>
                        </React.Fragment>
                    )}
                </Box>
            </Box>
        );
    }
}
