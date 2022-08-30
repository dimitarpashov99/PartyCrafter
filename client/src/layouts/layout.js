import React, { useEffect } from "react";

import { Header, Footer } from "./user";

import SideBar from "../components/Sidebar";
import GetDesignTokens from "../assets/themes/themes";

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
                            <Header />
                            <SideBar />
                            <main>
                                <Container
                                    disableGutters
                                    maxWidth="lg"
                                    sx={{
                                        minHeight: "80vh",
                                    }}
                                >
                                    {children}
                                    <Outlet />
                                </Container>
                            </main>
                            <Footer />
                        </React.Fragment>
                    )}
                </ThemeProvider>
            </ColorModeContext.Provider>
        </Box>
    );
};

export default Layout;
