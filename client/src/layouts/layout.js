import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import { Container, createTheme, ThemeProvider } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#301D9A",
      main: "#27187E",
    },
    secondary: {
      main: "#758BFD",
    },
  },
});
const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <ThemeProvider theme={defaultTheme}>
        <Container>
          <Header />
          <main>{children}</main>
          <Footer />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
