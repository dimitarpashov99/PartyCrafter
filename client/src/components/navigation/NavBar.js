import React from "react";
import { useEffect } from "react";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Divider,
    FormControlLabel,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";

import ColorModeContext from "../../contexts/colorModeContext";
import DarkModeSwitch from "./DarkModeSwitch";

import { AuthConsumer } from "../../contexts/authContext";
import { Logout } from "@mui/icons-material";

const NavBar = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [auth, setAuth] = React.useState(false);
    const authContext = AuthConsumer();
    useEffect(() => {
        console.log(authContext.auth);
        setAuth(authContext.auth);
    }, [authContext]);

    return (
        <AppBar position="sticky" sx={{}}>
            <Toolbar sx={{ justifyContent: "flex-end" }}>
                <Stack
                    spacing={1}
                    divider={<Divider orientation="vertical" flexItem />}
                    direction="row"
                >
                    <Box>
                        <ColorModeContext.Consumer>
                            {({ toggleColorMode }) => (
                                <FormControlLabel
                                    onChange={toggleColorMode}
                                    control={
                                        <DarkModeSwitch
                                            checked={
                                                theme.palette.mode === "dark"
                                                    ? true
                                                    : false
                                            }
                                        />
                                    }
                                    label=""
                                    labelPlacement="start"
                                    sx={{ width: 50 }}
                                />
                            )}
                        </ColorModeContext.Consumer>
                    </Box>
                    <Box>
                        {!auth && (
                            <NavLink to="/login">
                                <Button
                                    color="secondary"
                                    size="small"
                                    variant="outlined"
                                    sx={{ borderRadius: 12 }}
                                    endIcon={
                                        <PersonIcon
                                            fontSize="small"
                                            sx={{ marginRight: 0 }}
                                        />
                                    }
                                >
                                    <Typography
                                        color="secondary"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                md: "block",
                                            },
                                        }}
                                    >
                                        Sign in
                                    </Typography>
                                </Button>
                            </NavLink>
                        )}
                        {auth && (
                            <React.Fragment>
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={
                                            open ? "account-menu" : undefined
                                        }
                                        aria-haspopup="true"
                                        aria-expanded={
                                            open ? "true" : undefined
                                        }
                                    >
                                        <Avatar sx={{ width: 32, height: 32 }}>
                                            M
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: "visible",
                                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                            mt: 1.5,
                                            "& .MuiAvatar-root": {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            "&:before": {
                                                content: '""',
                                                display: "block",
                                                position: "absolute",
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: "background.paper",
                                                transform:
                                                    "translateY(-50%) rotate(45deg)",
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{
                                        horizontal: "right",
                                        vertical: "top",
                                    }}
                                    anchorOrigin={{
                                        horizontal: "right",
                                        vertical: "bottom",
                                    }}
                                >
                                    <MenuItem>
                                        <Typography
                                            sx={{
                                                display: {
                                                    xs: "none",
                                                    md: "block",
                                                },
                                            }}
                                        >
                                            <Avatar />
                                            My Profile
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <Typography
                                            sx={{
                                                display: {
                                                    xs: "none",
                                                    md: "block",
                                                },
                                            }}
                                        >
                                            <Logout />
                                            Sign out
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </React.Fragment>
                        )}
                    </Box>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
