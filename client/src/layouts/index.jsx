import React from "react";

import { Header, Footer } from "./user";

import SideBar from "../components/sidebar";
import GetDesignTokens from "../themes/themes";

import { AuthConsumer, ColorModeContext } from "../contexts";
import { Box, Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Outlet } from "react-router";

const Layout = ({ children }) => {
    const [mode, setMode] = React.useState("light"); // sets default color mode to "light"

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
            },
        }),
        []
    );

    const theme = React.useMemo(
        () => createTheme(GetDesignTokens(mode)),
        [mode]
    );
    const { auth } = AuthConsumer();

    return (
        <Box
            className={"layout-" + (auth?.profile?.role || "default")}
            variant="div"
        >
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <React.Fragment>
                        <Box
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.mode === "light"
                                        ? "#f5f5f5"
                                        : "#121212",
                            }}
                        >
                            <Header />
                            <SideBar />
                            <main>
                                <Container
                                    sx={{
                                        my: 0,
                                        minHeight: "80vh",
                                        paddingLeft: { xs: 0, md: 9 },
                                    }}
                                    maxWidth="false"
                                >
                                    {children}
                                    <Outlet />
                                </Container>
                            </main>
                            <Footer />
                        </Box>
                    </React.Fragment>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </Box>
    );
};

export default Layout;
