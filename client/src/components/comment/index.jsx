import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const Comment = (props) => {
    const { data } = props;
    return (
        <Box>
            <Stack direction="column">
                <span>Event: {data?.eventTitle}</span>
                <span>Date: {data?.createdOn}</span>
                <p>{data?.body}</p>
            </Stack>
        </Box>
    );
};

export default Comment;
