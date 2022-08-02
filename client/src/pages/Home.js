import { Box, Button, Container, Grid, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box className="landing" variant="div">
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            minHeight: "80vh",
            backgroundColor: "#CBC3E3",
            margin: 0,
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
              Tool for oranizing the perfect celebration.
            </Typography>
            <Grid alignItems="center">
              <Button className="pcButton" color="primary" size="large">
                Get Started
              </Button>
            </Grid>
          </Box>
        </Box>
        <Grid container sx={{ 
          paddingY: 6,
          backgroundColor: "#301D9A" }}>
          <Grid item md={6}></Grid>
          <Grid item md={6}>
            <Box>
              <Typography variant="body1">Host an Event</Typography>
            </Box>
            <Box>
              <Typography variant="body1">Join an Event</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
