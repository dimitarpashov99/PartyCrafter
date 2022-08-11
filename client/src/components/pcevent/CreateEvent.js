import React from "react";
import { Box } from "@mui/material";
import CreateEventForm from "../forms/CreateEventForm/CreateEventForm";

export default function CreateEvent() {
  return (
    <Box
      sx={{
        paddingTop: 8,
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
