import React from "react";
import { Box, Container, Grid } from "@mui/material";

export default function EventsLanding() {
  return (
    <Container>
      <Grid container sx={{justifyContent:"center"}}>
        <Grid item md={6}>
          <Box>Host</Box>
        </Grid>
        <Grid item md={6}>
          <Box>Guest</Box>
        </Grid>
      </Grid>
    </Container>
  );
}
