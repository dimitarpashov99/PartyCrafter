import React from "react";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import SideBar from "../components/Sidebar";
import GetDesignTokens from "../assets/themes/themes";

import ColorModeContext from "../contexts/colorModeContext";
import { Box, Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Outlet } from "react-router";

const Layout = ({ children }) => {
  const [mode, setMode] = React.useState("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = React.useMemo(() => createTheme(GetDesignTokens(mode)), [mode]);

  return (
    <Box className="layout" variant="div">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Header />
          <SideBar />
          <main>
            <Container
              disableGutters={{ xs: true, md: false }}
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
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Box>
  );
};

export default Layout;
