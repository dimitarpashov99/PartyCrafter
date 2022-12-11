import React, { useEffect } from "react";

import { Header, Footer } from "./user";

import SideBar from "../components/navigation/Sidebar";
import GetDesignTokens from "../themes/themes";

import ColorModeContext from "../contexts/colorModeContext";
import { Box, Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Outlet } from "react-router";
import AuthService from "../services/authService";
const Layout = ({ children }) => {
    const [mode, setMode] = React.useState("light");
    const [currentUser, setCurrentUser] = React.useState(null);
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

    useEffect(() => {
        const sessionUser = AuthService.getCurrentUser();

        if (sessionUser) {
            setCurrentUser(sessionUser);
        }
    }, []);
    return (
        <Box className="layout" variant="div">
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    {!currentUser && (
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
                                        disableGutters
                                        sx={{
                                            my: 0,
                                            maxWidth: "100vw",
                                            minHeight: "80vh",
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
                    )}
                </ThemeProvider>
            </ColorModeContext.Provider>
        </Box>
    );
};

export default Layout;
