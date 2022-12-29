import React from "react";
import {
    Button,
    FormControl,
    Input,
    InputLabel,
    Stack,
    TextField,
} from "@mui/material";
import { Box } from "@mui/material";

const ContactForm = () => {
    const [formStatus, setFormStatus] = React.useState("Send");
    const onSubmit = (e) => {
        e.preventDefault();
        setFormStatus("Submitting...");
        const { name, email, message } = e.target.elements;
        let conFom = {
            name: name.value,
            email: email.value,
            message: message.value,
        };
    };
    return (
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
                    <TextField minRows={5} id="message" required></TextField>
                </FormControl>
                <Button variant="contained" color="primary" type="submit">
                    {formStatus}
                </Button>
            </Stack>
        </Box>
    );
};
export default ContactForm;
