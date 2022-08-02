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

import PersonIcon from "@mui/icons-material/Person";

import { NavLink } from "react-router-dom";

const Header = () => {
  return (
      <Box variant="div" className="header">
        <AppBar position="sticky" sx={{ borderRadius: "0px 0px 16px 16px", py: "1rem" }}>
          <Toolbar variant="dense" sx={{ justifyContent: "flex-end" }}>
            <Stack
              spacing={1}
              divider={<Divider orientation="vertical" flexItem />}
              direction="row"
            >
              <Button variant="contained">
                <NavLink
                  to="/login"
                >
                  <Typography variant="h6" color="inherit" component="div">
                    <PersonIcon />
                    Sign in
                  </Typography>
                </NavLink>
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
  );
};

export default Header;
