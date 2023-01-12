import React from "react";
import {
    Box,
    Button,
    FormControl,
    Input,
    Paper,
    InputLabel,
    Stack,
    TextField,
} from "@mui/material";

const ContactForm = () => {
    const [formStatus, setFormStatus] = React.useState("Send");
    const onSubmit = (e) => {
        e.preventDefault();
        setFormStatus("Submitting...");
        const { name, email, message } = e.target.elements;
        let contactForm = {
            name: name.value,
            email: email.value,
            message: message.value,
        };
    };
    return (
        <Paper
            sx={{
                width: "100%",
                paddingTop: 8,
                paddingBottom: 15,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "background.default",
            }}
        >
            <Box component="form" onSubmit={onSubmit}>
                <Stack direction="column" spacing={3}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input type="text" id="name" required></Input>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input type="text" id="email" required></Input>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="message">Message</InputLabel>
                        <TextField
                            minRows={5}
                            id="message"
                            required
                        ></TextField>
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit">
                        {formStatus}
                    </Button>
                </Stack>
            </Box>
        </Paper>
    );
};
export default ContactForm;
