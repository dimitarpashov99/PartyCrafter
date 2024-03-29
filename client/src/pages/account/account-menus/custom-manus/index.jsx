import {
    Box,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import CreateFoodMenuForm from "../../../../components/forms/CreateFoodMenuForm";

const CustomMenus = () => {
    const [userMenus, setUserMenus] = useState([]);
    const handleCreateCustomMenu = (result) => {
        setUserMenus((current) => [...current, result.newMenu]);
    };
    return (
        <Paper sx={{ height: "100%" }}>
            <Typography component="h3" variant="h5">
                Your menus
            </Typography>
            <Grid container>
                <Grid item xs={4}>
                    {userMenus.length ? (
                        <List>
                            {userMenus?.map((menu) => (
                                <ListItem
                                    key={menu.id}
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                        >
                                            <DeleteOutline />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText primary={menu.name} />
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

export default CustomMenus;
