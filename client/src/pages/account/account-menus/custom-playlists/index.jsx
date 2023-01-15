import React, { useState } from "react";
import {
    Box,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography,
    IconButton,
    Paper,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import MusicPlaylistForm from "../../../../components/forms/MusicPlaylistForm";

const CustomPlaylists = () => {
    const [userPlaylists, setUserPlaylists] = useState([]);
    const handleCreatePlaylists = (result) => {
        setUserPlaylists((current) => [...current, result.newMenu]);
    };
    return (
        <Paper sx={{ height: "100%" }}>
            <Typography component="h3" variant="h5">
                Your music playlists
            </Typography>
            <Grid container>
                <Grid item xs={4}>
                    {userPlaylists.length ? (
                        <List>
                            {userPlaylists?.map((playlist) => (
                                <ListItem
                                    key={playlist.id}
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                        >
                                            <DeleteOutline />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText primary={playlist.name} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Box>You don't have custom playlists</Box>
                    )}
                </Grid>
                <Grid item xs={8}>
                    <MusicPlaylistForm
                        handleCreatePlaylists={handleCreatePlaylists}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CustomPlaylists;
