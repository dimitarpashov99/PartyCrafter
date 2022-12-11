import { Outlet } from "react-router";

import React from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const Events = () => {
    return (
        <Box>
            <Grid
                container
                sx={{
                    textAlign: "center",

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
                        padding: 5,
                        paddingLeft: 10,
                    }}
                >
                    <Box
                        sx={{
                            // display: "flex",
                            // flexGrow: 1,
                            height: "100%",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignContent: "center",
                            padding: 5,
                            border: "3px solid",
                            borderColor: "primary.main",
                            borderRadius: "12px",
                        }}
                    >
                        <Stack
                            direction="column"
                            spacing={3}
                            sx={{ flexGrow: 1 }}
                        >
                            <Typography variant="h4" component="h2">
                                Organize an event
                            </Typography>
                            <Button
                                className="btn"
                                color="primary"
                                variant="contained"
                            >
                                <Link to="/events/create">Host yourself</Link>
                            </Button>
                            <Typography variant="h6" component="h4">
                                OR
                            </Typography>
                            <Button
                                className="btn"
                                color="secondary"
                                variant="contained"
                            >
                                Hire an organizer
                            </Button>
                        </Stack>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        height: { md: "100%" },
                        backgroundColor: "#006E7F",
                        padding: 5,
                        paddingRight: 10,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            padding: 5,
                            alignContent: "center",
                            justifyContent: "center",
                            height: "100%",
                            border: "3px solid",
                            borderColor: "primary.main",
                            borderRadius: "12px",
                        }}
                    >
                        <Stack direction="column" spacing={3}>
                            <Typography variant="h4" component="h2">
                                Participate an event
                            </Typography>
                            <Button color="primary" variant="outlined">
                                Join existing event
                            </Button>
                            <Typography variant="h6" component="h4">
                                OR
                            </Typography>
                            <Button color="secondary" variant="outlined">
                                Browse public events
                            </Button>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
            <Outlet />
        </Box>
    );
}

export default Events