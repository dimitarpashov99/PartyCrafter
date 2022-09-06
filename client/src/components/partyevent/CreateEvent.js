import React from "react";
import { Box } from "@mui/material";
import CreateEventForm from "../forms/CreateEventForm/CreateEventForm";

const CreateEvent = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[500],
            }}
        >
            <CreateEventForm />
        </Box>
    );
}

export { CreateEvent };
