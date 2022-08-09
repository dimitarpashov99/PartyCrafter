import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <Box className="landing">
      <Box
        className="landing-banner"
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#CBC3E3",
          margin: 0,
          borderRadius: "0 0 16px 16px",
        }}
      >
        <Box
          variant="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h2" className="landing-title">
            Party Crafter
          </Typography>
          <Typography variant="h4" className="landing-subtitle">
            An all-in-one tool for oranizing the perfect celebration.
          </Typography>
          <Button
            className="pcButton"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              width: 200,
              marginTop: 5,
              marginX: "auto",
              borderRadius: 12,
            }}
          >
            <NavLink to="/events">
              <Typography variant="body1" color="text">
                Get Started
              </Typography>
            </NavLink>
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#301D9A",
          borderRadius: "16px",
        }}
      >
        <Grid
          container
          sx={{
            marginTop: 2,
            paddingY: 6
          }}
        >
          <Grid item md={6}>
            <Box>
              <Stack direction="row" spacing={6}></Stack>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box>
              <Typography variant="body1">Host an Event</Typography>
            </Box>
            <Box>
              <Typography variant="body1">Join an Event</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
