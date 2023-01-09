import {
    Avatar,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import Comment from "../../../../components/comment";

const UserComments = () => {
    const [comments, setComments] = useState();

    return (
        <Paper>
            Your comments:
            {comments?.length ? (
                <Stack direction="column" spacing={3}>
                    {comments?.map((comment) => (
                        <Comment data={comment.data}></Comment>
                    ))}
                </Stack>
            ) : (
                <Box>You don't have any comments</Box>
            )}
        </Paper>
    );
};

export default UserComments;
