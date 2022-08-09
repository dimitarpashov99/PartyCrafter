import React from "react";
import { Button, Divider, Stack, Toolbar, Typography } from "@mui/material";

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
        display: "flex",
        position: "fixed",
        marginY: "auto",
        left: { xs: 0, md: 6 },
        bottom: { xs: 0, md: "50%" },
        transform: { md: "translate(0, 50%)" },
        borderRadius: { xs: "32px 32px 0 0", md: "32px" },
        width: { xs: "100%", md: 100 },
        padding: { xs: "3px 0 12px 0", md: "32px 0px 32px 0px" },
        justifyContent: "center",
        borderColor: "primary",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[500],
      }}
    >
      <Stack
        spacing={{ xs: 4, md: 4 }}
        divider={
          <Divider orientation={{ xs: "vertical", md: "verticalhorizontal" }} />
        }
        direction={{ md: "column" }}
      >
        {navLinks.map(({ icon, link }) => {
          return (
            <NavLink
              to={link}
              className="nav-link"
              activeStyle={{
                color: "red",
              }}
            >
              <Button
                className="nav-btn"
                variant="outlined"
                sx={{ padding: "15px", borderRadius: 16 }}
              >
                <Typography variant="h4" color="inherit" component="div">
                  {icon}
                </Typography>
              </Button>
            </NavLink>
          );
        })}
      </Stack>
    </Toolbar>
  );
};
export default SideBar;
