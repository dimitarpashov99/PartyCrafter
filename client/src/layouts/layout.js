import React from "react";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import SideBar from '../components/Sidebar'
import { Box, createTheme, ThemeProvider } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#301D9A",
      main: "#6699CC",
    },
    secondary: {
      main: "#758BFD",
    },
    text: {
      primary: "#11131A",
    },
  },
});
const Layout = ({ children }) => {
  return (
    <Box className="layout" variant="div">
      <ThemeProvider theme={defaultTheme}>
        <Header />
        <SideBar />
        <main>{children}</main>
        <Footer />
      </ThemeProvider>
    </Box>
  );
};

export default Layout;
