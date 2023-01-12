import React from "react";
import AccountSecurity from "./account-security";
import AddressBook from "./address-book";
import CustomMenus from "./custom-manus";
import CustomPlaylists from "./custom-playlists";
import Profile from "./profile";
import UserComments from "./user-comments";
import UserEvents from "./user-events";

const accountTabs = [
    {
        id: "profile",
        label: "Profile",
        component: <Profile />,
    },
    {
        id: "events",
        label: "Events History",
        component: <UserEvents />,
    },
    {
        id: "comments",
        label: "Your comments",
        component: <UserComments />,
    },
    {
        id: "security",
        label: "Security",
        component: <AccountSecurity />,
    },
    {
        id: "address-book",
        label: "Addresses",
        component: <AddressBook />,
    },
    {
        id: "custom-food-menus",
        label: "Food Menus",
        component: <CustomMenus />,
    },
    {
        id: "custom-music-playlists",
        label: "Music Playlists",
        component: <CustomPlaylists />,
    },
];

export default accountTabs;
