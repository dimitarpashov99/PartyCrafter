import React, { useState } from "react";
import { Box, Paper, Button, List, ListItem } from "@mui/material";

const InvitationsPreview = (props) => {
    const userInvites = props?.invitations;
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
            elevation={10}
        >
            {userInvites?.length ? (
                <List>
                    {userInvites?.map((invite) => (
                        <ListItem
                            key={invite.id}
                            secondaryAction={<Button>Join</Button>}
                        />
                    ))}
                </List>
            ) : (
                <Box>Currently you have no invites</Box>
            )}
        </Paper>
    );
};

export default InvitationsPreview;
