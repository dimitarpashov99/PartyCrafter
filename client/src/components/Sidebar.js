import React from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";

import { NavLink } from "react-router-dom";

const navLinks = [
  { id: "home", icon: <HomeIcon />, label: "Home", link: "/" },
  { id: "events", icon: <EventIcon />, label: "Events", link: "/events" },
  { id: "aboutus", icon: <InfoIcon />, label: "About Us", link: "/aboutus" },
];

const SideBar = () => {
  return (
    <Toolbar
      variant="regular"
      sx={{
        position: 'fixed',
        marginY: "auto",
        left: 6,
        marginTop: "100px",
        borderRadius: "32px",
        width: 100,
        padding: "16px 0px 16px 0px",
      }}
    >
      <Stack
        spacing={1}
        divider={<Divider orientation="vertical" flexItem />}
        direction="column"
      >
        {navLinks.map(({ icon, link }) => {
          return (
            <Button variant="contained">
              <NavLink
                exact
                to={link}
                className={(isActive) =>
                  "nav-link" + (!isActive ? " unselected" : "")
                }
              >
                <Typography variant="h6" color="inherit" component="div">
                  {icon}
                </Typography>
              </NavLink>
            </Button>
          );
        })}
      </Stack>
    </Toolbar>
  );
};
export default SideBar;
