import React from "react";
import { Container, Paper, Tab, Tabs } from "@mui/material";

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
    const handleChange = () => {};
    return (
        <Container>
            <Paper
                sx={{
                    flexGrow: 1,
                    bgcolor: "background.paper",
                    display: "flex",
                    height: 224,
                }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    defaultValue={"profile"}
                    onChange={handleChange}
                    sx={{
                        borderRight: 1,
                        borderColor: "divider",
                        backgroundColor: "red",
                    }}
                >
                    {accountTabs?.map((tab) => {
                        <Tab key={tab.id} value={tab.id} label={tab.label} />;
                    })}
                </Tabs>
            </Paper>
        </Container>
    );
};

export default AccountPage;
