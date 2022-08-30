import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[500],
      }}
    >
      <Container maxWidth="sm">
        <Grid container>
          <Grid item>
            <Typography variant="body1">© 2022 Copyright PartyCrafter. All rights reserved.</Typography>
          </Grid>
          <Grid item sx={{justifyContent:'end'}}>
            <Facebook />
            <Instagram />
            <Twitter />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
