import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Comment from "../../../../components/comment";

const UserComments = () => {
    const [comments, setComments] = useState();

    return (
        <Paper sx={{ height: "100%" }}>
            <Typography component="h3" variant="h5">
                Your comments:
            </Typography>
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
