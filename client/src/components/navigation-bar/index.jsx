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
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";

import { ColorModeContext } from "../../contexts";
import DarkModeSwitch from "./DarkModeSwitch";

import { AuthConsumer } from "../../contexts";
import { AccountBox, Email, Logout } from "@mui/icons-material";
import LogoutDiag from "../logout";

const NavBar = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [logoutDiagOpen, setLogoutDiagOpen] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        setLogoutDiagOpen(true);
    };
    const { auth } = AuthConsumer();
    return (
        <AppBar position="sticky">
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
                        {!auth.authenticated && (
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
                        {auth.authenticated && (
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
                                        {auth.profile && auth.profile.avatar ? (
                                            <Avatar
                                                src={auth.profile.avatar.src}
                                                alt={auth.profile.firstName[0]}
                                                sx={{ width: 32, height: 32 }}
                                            />
                                        ) : (
                                            <Avatar
                                                sx={{ width: 32, height: 32 }}
                                            >
                                                {auth.profile.firstName[0]}
                                            </Avatar>
                                        )}
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: "visible",
                                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                            mt: 1.5,
                                            "&:before": {
                                                content: '""',
                                                display: "block",
                                                position: "absolute",
                                                top: 0,
                                                right: 14,
                                                width: 15,
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
                                    <NavLink
                                        to="/account"
                                        style={{ textDecoration: "none" }}
                                    >
                                        {({ isActive }) =>
                                            !isActive && (
                                                <MenuItem>
                                                    <ListItemIcon>
                                                        <PersonIcon />
                                                    </ListItemIcon>
                                                    <ListItemText>
                                                        My Account
                                                    </ListItemText>
                                                </MenuItem>
                                            )
                                        }
                                    </NavLink>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <Email />
                                        </ListItemIcon>
                                        <ListItemText>Invites</ListItemText>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Typography>
                                            <Logout />
                                            Sign out
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </React.Fragment>
                        )}
                    </Box>
                </Stack>
                <LogoutDiag
                    isOpen={logoutDiagOpen}
                    setOpen={setLogoutDiagOpen}
                />
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
