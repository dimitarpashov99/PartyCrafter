import {
    Box,
    Button,
    Container,
    Grid,
    ListItem,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
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
                    minHeight: "80vh",
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
                        An all-in-one tool for oranizing the perfect digital
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
                    mx: { xs: 0, md: 8 },
                    borderRadius: "16px",
                }}
                ref={nextStep}
            >
                <Grid
                    container
                    sx={{
                        display: "flex",
                        minHeight: "90vh",
                        marginTop: 5,
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        md={7}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gridAutoFlow: "column",
                            padding: 3,
                            height: "100%",
                            flexGrow: 1,
                        }}
                    >
                        <Paper
                            elevation={6}
                            sx={{
                                border: "3px solid",
                                borderColor: "primary.main",
                                borderRadius: "16px",
                                flexGrow: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "start",
                                height: "100%",
                            }}
                        >
                            <Stack
                                direction="column"
                                spacing={2}
                                sx={{
                                    minHeight: "80vh",
                                    justifyContent: "space-evenly",
                                    textAlign: "center",
                                }}
                            >
                                <Typography variant="h5">
                                    How does it work?
                                </Typography>
                                <Typography variant="body1">
                                    Create a digital plan for your party
                                </Typography>
                                <Typography variant="body1">
                                    Send invites to your guests
                                </Typography>
                                <Typography variant="body1">
                                    Spectate real time
                                </Typography>
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={5}
                        sx={{ padding: 3, height: "100%" }}
                    >
                        <Stack
                            direction="column"
                            spacing={2}
                            sx={{
                                maxWidth: { xs: "100vw", md: "80vw" },
                                minHeight: "80vh",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <Paper
                                elevation={6}
                                sx={{
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === "light"
                                            ? "#fceaaa"
                                            : "#f7c310",
                                    borderRadius: "16px",
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignContent: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Link to="/events/create">
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
                                        <Typography
                                            variant="h6"
                                            color="primary"
                                        >
                                            Create your party
                                        </Typography>
                                    </Button>
                                </Link>
                                <Typography variant="body1" color="secondary">
                                    Schedule a party event and invite your
                                    guests
                                </Typography>
                            </Paper>
                            <Paper
                                elevation={6}
                                sx={{
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === "light"
                                            ? "#72ecff"
                                            : "#006E7F",
                                    borderRadius: "16px",
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignContent: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Link to="/events/join">
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
                                        <Typography
                                            variant="h6"
                                            color="common.white"
                                        >
                                            Join the party
                                        </Typography>
                                    </Button>
                                </Link>
                                <Typography variant="body1" color="secondary">
                                    Check out existing events
                                </Typography>
                            </Paper>
                            <Paper
                                elevation={6}
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
                                            color="common.white"
                                        >
                                            More Options
                                        </Typography>
                                    </Link>
                                </Button>
                            </Paper>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Home;
