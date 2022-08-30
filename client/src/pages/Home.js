import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useRef } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const nextStep = useRef(null);
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
                        An all-in-one tool for oranizing the perfect
                        celebration.
                    </Typography>
                    <Button
                        className="pcButton"
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() =>
                            nextStep.current.scrollIntoView({
                                block: "start",
                                behavior: "smooth",
                            })
                        }
                        sx={{
                            width: 200,
                            marginTop: 5,
                            marginX: "auto",
                            borderRadius: 12,
                        }}
                    >
                        <Typography variant="body1" color="text">
                            Get Started
                        </Typography>
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    borderRadius: "16px",
                }}
                ref={nextStep}
            >
                <Grid
                    container
                    sx={{
                        minHeight: "90vh",
                        marginTop: 2,
                    }}
                >
                    <Grid item md={6} sx={{ padding: 3, height: "100%" }}>
                        <Box></Box>
                    </Grid>
                    <Grid item md={6} sx={{ padding: 3, height: "100%" }}>
                        <Stack
                            direction="column"
                            spacing={2}
                            sx={{
                                minHeight: "80vh",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: "#F8CB2E",
                                    borderRadius: "16px",
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignContent: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    className="pcButton"
                                    variant="outlined"
                                    color="primary"
                                    size="large"
                                    sx={{
                                        width: 300,
                                        marginBottom: 2,
                                        marginX: "auto",
                                        borderRadius: 12,
                                    }}
                                >
                                    <Link to="/events">
                                        <Typography variant="h6">
                                            Create your party
                                        </Typography>
                                    </Link>
                                </Button>
                                <Typography variant="body1">
                                    Schedule a party event and invite your
                                    guests
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: "#006E7F",
                                    borderRadius: "16px",
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignContent: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    className="pcButton"
                                    variant="outlined"
                                    color="primary"
                                    size="large"
                                    sx={{
                                        width: 300,
                                        marginBottom: 2,
                                        marginX: "auto",
                                        borderRadius: 12,
                                    }}
                                >
                                    <Link to="/events">
                                        <Typography variant="h6">
                                            Join the party
                                        </Typography>
                                    </Link>
                                </Button>
                                <Typography variant="body1">
                                    Check out existing events
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: "primary.main",
                                    borderRadius: "16px",
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignContent: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    className="pcButton"
                                    variant="outlined"
                                    color="primary"
                                    size="large"
                                    sx={{
                                        width: 300,
                                        marginBottom: 2,
                                        marginX: "auto",
                                        borderRadius: 12,
                                    }}
                                >
                                    <Link to="/events">
                                        <Typography
                                            variant="body1"
                                            color="primary"
                                        >
                                            More Options
                                        </Typography>
                                    </Link>
                                </Button>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Home;
