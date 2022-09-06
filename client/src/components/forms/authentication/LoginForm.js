import React from "react";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import AuthService from "../../../services/authService";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            rememberMe: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.navigation = props.navigation;
        this.handleLogin = props.handleLogin;
    }

    changeEmail = (event) => {
        this.setState({ email: event.target.value });
    };

    changePassword = (event) => {
        this.setState({ password: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        AuthService.login(this.state.email, this.state.password).then(() => {
            this.handleLogin();
            this.navigation("/home");
        });
    };

    render() {
        return (
            <Paper
                sx={{
                    width: { xs: "100vw", md: "80vw" },
                    paddingTop: 8,
                    paddingBottom: 15,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "background.default",
                }}
            >
                <Avatar sx={{ m: 2, bgcolor: "primary.main" }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h2" variant="h5">
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={this.handleSubmit}
                    noValidate
                    sx={{ mt: 1, px: 4 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        onChange={this.changeEmail}
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        onChange={this.changePassword}
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={this.state.rememberMe}
                                color="primary"
                            />
                        }
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        );
    }
}
