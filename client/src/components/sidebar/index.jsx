import React from "react";
import {
    Box,
    Divider,
    Icon,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import ContactPageIcon from "@mui/icons-material/ContactPage";

import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import { Person2Outlined } from "@mui/icons-material";

import { NavLink } from "react-router-dom";
import { AuthConsumer } from "../../contexts";

const navLinks = [
    {
        id: "home",
        icon: HomeIcon,
        label: "Home",
        link: "/home",
    },
    {
        id: "events",
        icon: EventIcon,
        label: "Events",
        link: "/events",
    },
    // {
    //     id: "contactus",
    //     icon: ContactPageIcon,
    //     label: "Contact us",
    //     link: "/contactus",
    // },
    {
        id: "account",
        icon: Person2Outlined,
        label: "Account",
        link: "/account",
        protected: true,
    },
];

const SideBar = () => {
    const { auth } = AuthConsumer();
    return (
        <Toolbar
            variant="regular"
            sx={{
                zIndex: 1000,
                display: "flex",
                position: "fixed",
                marginY: "auto",
                left: { xs: 0, md: 6 },
                bottom: { xs: 0, md: "50%" },
                transform: { md: "translate(0, 50%)" },
                width: { xs: "100%", md: 50 },
                padding: { xs: "3px 0 12px 0", md: "32px 0px 32px 0px" },
                justifyContent: "center",
                border: "3px solid",
                borderColor: "primary.main",
                borderRadius: { xs: "32px 32px 0 0", md: "32px" },
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
            }}
        >
            <Stack
                spacing={2}
                divider={<Divider />}
                direction={{ md: "column" }}
                sx={{
                    flexGrow: { xs: 0, md: 1 },
                    justifyContent: "center",
                    textAlign: "center",
                }}
            >
                {navLinks.map((navLink) => {
                    if (navLink.protected && !auth.authenticated) {
                        return "";
                    }
                    return (
                        <Box key={navLink.id}>
                            <Tooltip
                                title={navLink.label}
                                arrow
                                placement="right"
                            >
                                <NavLink to={navLink.link} className="nav-link">
                                    {({ isActive }) => (
                                        <Typography
                                            variant="h4"
                                            color="inherit"
                                            component="div"
                                        >
                                            <Icon
                                                component={navLink.icon}
                                                color={
                                                    isActive
                                                        ? "primary"
                                                        : "disabled"
                                                }
                                                fontSize={
                                                    isActive
                                                        ? "large"
                                                        : "medium"
                                                }
                                            ></Icon>
                                        </Typography>
                                    )}
                                </NavLink>
                            </Tooltip>
                        </Box>
                    );
                })}
            </Stack>
        </Toolbar>
    );
};
export default SideBar;
