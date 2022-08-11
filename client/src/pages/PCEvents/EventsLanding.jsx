import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
export default function EventsLanding() {
  return (
    <Grid
      container
      sx={{
        textAlign: "center",
        height: { md: "80vh" },
        justifyContent: "center",
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          height: { md: "100%" },
          backgroundColor: "#F8CB2E",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            height: "100%",
            flexDirection: "column",
            paddingX: { xs: 4, md: 16 },
            alignContent: "center",
          }}
        >
          <Typography variant="h4" component="h2">
            Organize an event
          </Typography>
          <Button className="btn" color="primary" variant="contained">
            <Link to="/events/create">Host yourself</Link>
          </Button>
          <Button className="btn" color="secondary" variant="contained">
            Hire an organizer
          </Button>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          height: { md: "100%" },
          backgroundColor: "#006E7F",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingX: { xs: 4, md: 16 },
            alignContent: "center",
          }}
        >
          <Typography variant="h4" component="h2">
            Participate an event
          </Typography>
          <Button color="primary" variant="outlined">
            Join existing event
          </Button>
          <Button color="secondary" variant="outlined">
            Browse public events
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
