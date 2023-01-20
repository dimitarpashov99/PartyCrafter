import React from "react";
import { Backdrop, Box, Fade, Modal } from "@mui/material";

const CustomModal = (props) => {
    const isOpen = props?.isOpen;
    const handleClose = props?.onClose;
    return (
        <Modal
            open={isOpen}
            onClose={() => {
                handleClose();
            }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                        maxHeight: "90vh",
                        overflowY: "scroll",
                    }}
                >
                    {props?.body}
                </Box>
            </Fade>
        </Modal>
    );
};

export default CustomModal;
