import React from "react";
import {
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import RadioGroupRating from "../../rating";
import commentsService from "../../../services/commentsService";
import CustomCheckboxGroup from "../../checkbox";
const CommentForm = (props) => {
    const eventId = props?.eventId;
    const checkBoxElements = [
        { id: "music", label: "Music" },
        { id: "food", label: "Food" },
        { id: "location", label: "Location" },
        { id: "enviroment", label: "Enviroment" },
    ];
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        console.log(e.target.elements);
        // const commentData =
        // const result = await commentsService.createComment()
    };
    return (
        <Paper>
            <Box component="form" onSubmit={handleFormSubmit}>
                <Stack direction="column">
                    <Box>
                        <Typography variant="h6">
                            Leave your opinion about this event
                        </Typography>
                    </Box>
                    <Box>
                        <RadioGroupRating />
                    </Box>
                    <Box>
                        <TextField
                            id="commenttitle"
                            name="comment-title"
                            label="Title"
                            fullWidth
                        />
                    </Box>
                    <Box>
                        <TextField
                            id="commentbody"
                            name="comment-body"
                            label="Comment"
                            multiline
                            fullWidth
                            minRows={5}
                        />
                    </Box>
                    <Box>
                        <Stack direction="row">
                            <CustomCheckboxGroup
                                label="Did you like any of the following?"
                                elements={checkBoxElements}
                            />
                        </Stack>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <Button type="submit" variant="contained">
                            Send
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Paper>
    );
};

export default CommentForm;
