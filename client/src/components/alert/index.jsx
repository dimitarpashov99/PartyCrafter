import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import React, { useState } from "react";

import { Close } from "@mui/icons-material";
const CustomizedAlert = ({ alert }) => {
    const [open, setOpen] = useState(alert?.open || false);
    return (
        <Collapse in={open}>
            <Alert
                severity={alert?.type || "info"}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <Close fontSize="inherit" />
                    </IconButton>
                }
            >
                <AlertTitle>{alert?.title}</AlertTitle>
                {alert?.message}
            </Alert>
        </Collapse>
    );
};

export default CustomizedAlert;
