import React from "react";
import { Box, Link } from "@mui/material";

class PageNotFound extends React.Component {
    render() {
        return (
            <Box
                sx={{
                    fontSize: 40,
                    display: "flex",
                    flexDirectrion: "column",
                    justifyContent: "center",
                }}
            >
                <span>Sorry this is not the way for your party</span>
                <Link href="/home">Return to Home</Link>
            </Box>
        );
    }
}

export default PageNotFound;
