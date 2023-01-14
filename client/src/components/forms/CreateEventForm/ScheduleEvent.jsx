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
    Stack,
    Icon,
    IconButton,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
    AddCircleOutlineOutlined,
    RemoveCircleOutlineOutlined,
} from "@mui/icons-material";

function StepOne(props) {
    const { handleFormChange } = props;
    const [formState, setFormState] = useState(props.formState);
    const [eventImage, setImage] = useState();
    const [selectedFile, setSelectedFile] = useState(formState.eventImage);
    const handleChangeDate = (newValue) => {
        setFormState((current) => ({ ...current, date: newValue }));
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
        setSelectedFile(e.target.files[0]);
    };
    useEffect(() => {
        handleFormChange(formState);
    }, [formState, handleFormChange]);

    return (
        <Box>
            <Grid container>
                <Grid
                    item
                    xs={12}
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
                        value={formState.title}
                        onChange={(e) => {
                            setFormState((current) => ({
                                ...current,
                                title: e.target.value,
                            }));
                        }}
                    />
                    <Stack direction="row" spacing={2} sx={{ paddingTop: 5 }}>
                        <DateTimePicker
                            label="Event Date"
                            value={formState.date}
                            onChange={handleChangeDate}
                            minDate={new Date()}
                            ampm={false}
                            renderInput={(params) => (
                                <TextField
                                    id="event-date"
                                    name="event-date"
                                    label="Event Date"
                                    {...params}
                                />
                            )}
                        />

                        <IconButton
                            onClick={() => {
                                setFormState((current) => ({
                                    ...current,
                                    durationInHours: current.durationInHours--,
                                }));
                            }}
                            variant="outlined"
                        >
                            <RemoveCircleOutlineOutlined />
                        </IconButton>
                        <TextField
                            sx={{ flexGrow: 1 }}
                            type="number"
                            label="Duration (in hours)"
                            inputProps={{ min: 1, pattern: "^[+]?d+([.]d+)?$" }}
                            value={formState?.durationInHours}
                            onChange={(e) => {
                                e.preventDefault();
                                if (e.target.value > 0)
                                    setFormState((current) => ({
                                        ...current,
                                        durationInHours: e.target.value,
                                    }));
                            }}
                        />
                        <IconButton
                            onClick={() => {
                                setFormState((current) => ({
                                    ...current,
                                    durationInHours: current.durationInHours++,
                                }));
                            }}
                            variant="outlined"
                        >
                            <AddCircleOutlineOutlined />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" justifyContent="center">
                        <FormControlLabel
                            sx={{ my: 2 }}
                            control={
                                <Switch
                                    checked={formState?.privateAccess}
                                    onChange={(e) => {
                                        setFormState((current) => ({
                                            ...current,
                                            privateAccess: e.target.checked,
                                        }));
                                    }}
                                />
                            }
                            label="Public Event"
                        />
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        padding: 5,
                    }}
                >
                    <Stack direction="column">
                        <Typography variant="body1" color="primary">
                            Event Image
                        </Typography>
                        {selectedFile && (
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setImage(undefined);
                                    setSelectedFile(undefined);
                                }}
                                color="error"
                            >
                                Change
                            </Button>
                        )}
                    </Stack>
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
                    <Box
                        sx={{
                            border: "3px solid",
                            borderColor: "primary.main",
                            borderRadius: "12px",
                            height: "100%",
                        }}
                    >
                        {selectedFile ? (
                            <img
                                className="preview-img"
                                src={eventImage}
                                alt=""
                            />
                        ) : (
                            <Button
                                variant="outlined"
                                sx={{ width: "100%", height: "100%" }}
                            >
                                <label htmlFor="event-image-file">
                                    <AddPhotoAlternateIcon />
                                    UPLOAD
                                </label>
                            </Button>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ padding: 5 }}>
                    <TextField
                        id="event-description"
                        name="event_description"
                        label="Event Description"
                        multiline
                        fullWidth
                        minRows={5}
                        value={formState?.description}
                        onChange={(e) => {
                            setFormState((current) => ({
                                ...current,
                                description: e.target.value,
                            }));
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export { StepOne };
