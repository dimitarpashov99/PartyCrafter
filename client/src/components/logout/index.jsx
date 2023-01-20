import * as React from "react";

import { AuthConsumer } from "../../contexts";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import CustomDialog from "../dialog";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     "& .MuiDialogContent-root": {
//         padding: theme.spacing(2),
//     },
//     "& .MuiDialogActions-root": {
//         padding: theme.spacing(1),
//     },
// }));
// function BootstrapDialogTitle(props) {
//     const { children, onClose, ...other } = props;

//     return (
//         <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//             {children}
//             {onClose ? (
//                 <IconButton
//                     aria-label="close"
//                     onClick={onClose}
//                     sx={{
//                         position: "absolute",
//                         right: 8,
//                         top: 8,
//                         color: (theme) => theme.palette.grey[500],
//                     }}
//                 >
//                     <CloseIcon />
//                 </IconButton>
//             ) : null}
//         </DialogTitle>
//     );
// }
const LogoutDiag = ({ isOpen, setOpen }) => {
    const { setAuth } = AuthConsumer();
    const navigate = useNavigate();
    const handleClose = () => {
        setOpen(false);
    };
    const handleLogout = () => {
        setAuth({ authenticated: false, profile: null, invitations: [] });
        setOpen(false);
        navigate("/home");
    };
    return (
        <>
            <CustomDialog
                title="Logout"
                content="Are you sure you want to sign out?"
                actions={
                    <>
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
                    </>
                }
                isOpen={isOpen}
                handleClose={handleClose}
            />
            {/* <BootstrapDialog
                onClose={handleClose}
                open={isOpen}
            >
                <BootstrapDialogTitle
                    onClose={handleClose}
                >
                    Logout
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    Are you sure you want to sign out?
                </DialogContent>
                <DialogActions>
                    
                </DialogActions>
            </BootstrapDialog> */}
        </>
    );
};

export default LogoutDiag;
