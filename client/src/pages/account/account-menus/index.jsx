import Profile from "./profile";
import UserInvitations from "./user-events";

const accountTabs = [
    {
        id: "profile",
        label: "Profile",
        component: <Profile />,
    },
    {
        id: "events",
        label: "Your Events",
        component: <UserInvitations />,
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
];

export default accountTabs;
