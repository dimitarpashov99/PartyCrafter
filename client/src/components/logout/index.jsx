import * as React from "react";

import { AuthConsumer } from "../../contexts/authContext";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));
function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}
const LogoutDiag = ({ isOpen, setOpen }) => {
    const { setAuth } = AuthConsumer();
    const navigate = useNavigate();
    const handleClose = () => {
        setOpen(false);
    };
    const handleLogout = () => {
        // AuthService.logout().then(() => {
        setAuth({ authenticated: false, profile: null });
        setOpen(false);
        navigate("/home");
        // });
    };
    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={isOpen}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    Logout
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    Are you sure you want to sign out?
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="contained"
                        autoFocus
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
};

export default LogoutDiag;
