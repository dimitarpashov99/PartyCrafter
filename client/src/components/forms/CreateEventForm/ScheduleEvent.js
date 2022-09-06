import React from "react";
import { useState, useEffect } from "react";
import {
    Box,
    FormControlLabel,
    Grid,
    Switch,
    Typography,
    TextField,
    Button,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function StepOne(props) {
    const [eventImage, setImage] = useState();
    const formState = props.formState;
    const handleFormChange = props.handleFormChange;
    const [selectedFile, setSelectedFile] = useState(formState.eventImage);
    const handleChangeDate = (newValue) => {
        var eventData = formState;
        eventData.eventDate = newValue;
        handleFormChange(eventData);
    };
    useEffect(() => {
        if (!selectedFile) {
            setImage(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setImage(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);
    const handleUploadClick = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        formState.eventImage = e.target.files[0];
        handleFormChange(formState);
        setSelectedFile(e.target.files[0]);
    };
    return (
        <Box>
            <Grid container>
                <Grid
                    item
                    md={6}
                    sx={{
                        padding: 5,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <TextField
                        id="event-title"
                        name="event_title"
                        label="Event Title"
                        margin="normal"
                        required
                        autoComplete="off"
                        autoFocus
                        value={formState.eventTitle}
                        onChange={(e) => {
                            formState.eventTitle = e.target.value;
                            handleFormChange(formState);
                        }}
                    />

                    <Box sx={{ paddingTop: 5 }}>
                        <DateTimePicker
                            label="Event Date"
                            value={formState.eventDate}
                            onChange={handleChangeDate}
                            ampm={false}
                            renderInput={(params) => (
                                <TextField
                                    id="event-date"
                                    name="event-date"
                                    fullWidth
                                    label="Event Date"
                                    {...params}
                                />
                            )}
                        />
                    </Box>
                    <FormControlLabel
                        sx={{ my: 2 }}
                        control={
                            <Switch
                                checked={formState.privateEvent}
                                onChange={(e) => {
                                    formState.privateEvent = e.target.checked;
                                    handleFormChange(formState);
                                }}
                            />
                        }
                        label="Private Event"
                    />
                </Grid>
                <Grid
                    item
                    md={6}
                    sx={{
                        padding: 5,
                    }}
                >
                    <Typography variant="body1" color="primary">
                        Event Image
                    </Typography>
                    <Box
                        sx={{
                            display: "none",
                            border: "3px solid",
                            borderColor: "primary.main",
                        }}
                    >
                        <input
                            accept="image/*"
                            id="event-image-file"
                            name="event-image-file"
                            type="file"
                            onChange={handleUploadClick}
                        />
                    </Box>
                    {selectedFile ? (
                        <Box
                            sx={{
                                border: "3px solid",
                                borderColor: "primary.main",
                                borderRadius: "12px",
                            }}
                        >
                            <img
                                className="preview-img"
                                src={eventImage}
                                alt=""
                            />
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                border: "3px solid",
                                borderColor: "primary.main",
                                borderRadius: "12px",
                                height: "100%",
                                alignItems: "center",
                            }}
                        >
                            <label htmlFor="event-image-file">
                                <Button
                                    variant="outlined"
                                    startIcon={<AddPhotoAlternateIcon />}
                                >UPLOAD</Button>
                            </label>
                        </Box>
                    )}
                </Grid>
                <Grid item xs={12} sx={{ padding: 5 }}>
                    <TextField
                        id="event-description"
                        name="event_description"
                        label="Event Description"
                        multiline
                        fullWidth
                        minRows={5}
                        value={formState.eventDescription}
                        onChange={(e) => {
                            formState.eventDescription = e.target.value;
                            handleFormChange(formState);
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export { StepOne };
