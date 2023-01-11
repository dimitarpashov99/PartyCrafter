import React, { useState } from "react";
import {
    Grid,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Paper,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";

const CustomPlaylists = () => {
    const [userPlaylists, setUserPlaylists] = useState([]);
    const handleCreateCustomMenu = (result) => {
        setUseMenus((current) => [...current, result.newMenu]);
    };
    return (
        <Paper sx={{ height: "100%" }}>
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
                        <Box>You don't have custom food menus</Box>
                    )}
                </Grid>
                <Grid item xs={8}>
                    <CreateFoodMenuForm
                        handleCreateCustomMenu={handleCreateCustomMenu}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CustomPlaylists;
