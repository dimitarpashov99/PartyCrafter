import React from "react";
import {
    Container,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Paper,
    Stack,
} from "@mui/material";
import { NavLink, Routes, Route, useMatch, useParams } from "react-router-dom";
import { Box } from "@mui/system";

const accountTabs = [
    {
        id: "profile",
        label: "Profile",
    },
    {
        id: "events",
        label: "Your Events",
    },
    {
        id: "comments",
        label: "Your comments",
    },
    {
        id: "security",
        label: "Security",
    },
    {
        id: "address-book",
        label: "Addresses",
    },
    {
        id: "custom-music-playlists",
        label: "Music Playlists",
    },
    {
        id: "custom-food-menus",
        label: "Food Menus",
    },
    {
        id: "custom-guestlists",
        label: "GuestLists",
    },
];

const AccountPage = () => {
    const params = useParams();
    return (
        <Paper sx={{ height: "100%" }}>
            <Stack direction="row">
                <List
                    sx={{
                        width: "100%",
                        maxWidth: 240,
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader
                            component="div"
                            id="nested-list-subheader"
                        >
                            My Account
                        </ListSubheader>
                    }
                >
                    {accountTabs?.map((tab) => (
                        <ListItem>
                            <NavLink
                                key={tab.id}
                                to={"/account/" + tab.id}
                                style={{ flexGrow: 1, textDecoration: "none" }}
                            >
                                {({ isActive }) => (
                                    <ListItemButton selected={isActive}>
                                        <ListItemText primary={tab.label} />
                                    </ListItemButton>
                                )}
                            </NavLink>
                        </ListItem>
                    ))}
                </List>
                <Box>
                    {accountTabs?.map((tab) => {
                        if (tab.id === params.id) return <Box>{tab.label}</Box>;
                    })}
                </Box>
            </Stack>
        </Paper>
    );
};

export default AccountPage;
