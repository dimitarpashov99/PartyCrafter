import React from "react";
import {
    Box,
    Divider,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";

import { NavLink } from "react-router-dom";

const navLinks = [
    {
        id: "home",
        icon: <HomeIcon color="primary" />,
        label: "Home",
        link: "/home",
    },
    {
        id: "events",
        icon: <EventIcon color="primary" />,
        label: "Events",
        link: "/events",
    },
];

const SideBar = () => {
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
                sx={{ flexGrow: { xs: 0, md: 1 }, justifyContent: "center" , textAlign:'center'}}
            >
                {navLinks.map((navLink) => {
                    return (
                        <Box key={navLink.id}>
                            <Tooltip
                                title={navLink.label}
                                arrow
                                placement="right"
                            >
                                <NavLink to={navLink.link} className="nav-link">
                                    <Typography
                                        variant="h4"
                                        color="inherit"
                                        component="div"
                                    >
                                        {navLink.icon}
                                    </Typography>
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
