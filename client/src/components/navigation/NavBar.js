import React from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  FormControlLabel,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import DarkModeSwitch from "./DarkModeSwitch";
import { useTheme } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { NavLink } from "react-router-dom";
import ColorModeContext from "../../contexts/colorModeContext";

const NavBar = () => {
  const theme = useTheme();
  return (
    <AppBar color="primary" position="sticky">
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <Stack
          spacing={1}
          divider={<Divider orientation="vertical" flexItem />}
          direction="row"
        >
          <Box>
            <ColorModeContext.Consumer>
              {({ toggleColorMode }) => (
                <FormControlLabel
                  onChange={toggleColorMode}
                  control={
                    <DarkModeSwitch
                      checked={theme.palette.mode === "dark" ? true : false}
                    />
                  }
                  label=""
                  labelPlacement="start"
                  sx={{ width: 50 }}
                />
              )}
            </ColorModeContext.Consumer>
          </Box>
          <Box>
            <Button
              size="small"
              variant="contained"
              sx={{ borderRadius: 12}}
              endIcon={<PersonIcon fontSize="small" sx={{marginRight: 0}} />}
            >
              <NavLink to="/login">
                <Typography sx={{ display: { xs: "none", md: "block" } }}>
                  Sign in
                </Typography>
              </NavLink>
            </Button>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
