import React from "react";
import {
  AppBar,
  Button,
  Grid,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="header">
        <AppBar position="sticky" sx={{ borderRadius: "0px 0px 16px 16px" }}>
          <Toolbar variant="dense" sx={{ justifyContent: "flex-end" }}>
            <Stack
              spacing={1}
              divider={<Divider orientation="vertical" flexItem />}
              direction="row"
            >
              <Button variant="contained">
                <NavLink
                  to="/"
                  className={(isActive) =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                >
                  <Typography variant="h6" color="inherit" component="div">
                    Home
                  </Typography>
                </NavLink>
              </Button>
              <Button variant="contained">
                <NavLink
                  to="/events"
                  className={(isActive) =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                >
                  <Typography variant="h6" color="inherit" component="div">
                    Events
                  </Typography>
                </NavLink>
              </Button>
              <Button variant="contained">
                <NavLink
                  to="/aboutus"
                  className={(isActive) =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                >
                  <Typography variant="h6" color="inherit" component="div">
                    About us
                  </Typography>
                </NavLink>
              </Button>
              <Button variant="contained">
                <NavLink
                  to="/login"
                  className={(isActive) =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                >
                  <Typography variant="h6" color="inherit" component="div">
                    Login
                  </Typography>
                </NavLink>
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
      </div>
    </header>
  );
};

export default Header;
