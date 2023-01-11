import React from "react";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
    Typography,
    TextField,
    Select,
    MenuItem,
    Button,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import { v4 as uuidv4 } from "uuid";
import { createCustomMenu } from "../../../services/menuService";

export default function CreateFoodMenuForm(props) {
    const typesOfFood = [
        { id: "none", name: "-" },
        { id: "appetizer", name: "Appetizer" },
        { id: "soup", name: "Soup" },
        { id: "salad", name: "Salad" },
        { id: "main_dish", name: "Main Dish" },
        { id: "bbq", name: "BBQ" },
        { id: "vegan", name: "Vegan" },
        { id: "dessert", name: "Dessert" },
    ];
    const typesOfDrink = [
        { id: "none", name: "-" },
        { id: "alcochol", name: "Alcochol" },
        { id: "non_alcochol", name: "Non Alcochol" },
    ];
    const [newMenuItem, setNewMenuItem] = useState({
        id: uuidv4(),
        name: "",
        itemType: "none",
        type: "none",
    });
    const [customMenu, setCustomMenu] = useState({
        user: props.user || "admin",
        title: "",
        menuItems: [],
    });

    return (
        <Box>
            <Box sx={{ paddingBottom: 3 }}>
                <Typography variant="h6">
                    Create a food menu for your party
                </Typography>
            </Box>
            <Box component="form">
                <Typography variant="body1">Menu Name:</Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        paddingBottom: 2,
                    }}
                >
                    <TextField
                        id="menu_name"
                        label=""
                        value=""
                        onChange={(ev) => {
                            setCustomMenu({
                                ...customMenu,
                                title: ev.target.value,
                            });
                        }}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => {
                            const result = createCustomMenu(customMenu);
                            if (result?.success) {
                                props.handleCreateCustomMenu(result);
                            }
                        }}
                    >
                        Create
                    </Button>
                </Box>
                <Grid
                    container
                    sx={{ minWidth: "80vw", justifyContent: "center" }}
                >
                    <Grid item lg={6} sx={{ paddingX: 5 }}>
                        <Box sx={{ paddingBottom: 2 }}>
                            <Typography variant="body1">
                                Add Item to your menu:
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <React.Fragment>
                                <Select
                                    value={newMenuItem.type || "none"}
                                    onChange={(ev) => {
                                        setNewMenuItem({
                                            type: ev.target.value,
                                        });
                                    }}
                                >
                                    <MenuItem value="none"> - </MenuItem>
                                    <MenuItem value="food">Food</MenuItem>
                                    <MenuItem value="drink">Drink</MenuItem>
                                </Select>
                                {newMenuItem.type === "food" &&
                                    typesOfFood.length && (
                                        <Select
                                            value={
                                                newMenuItem.itemType || "none"
                                            }
                                            onChange={(ev) => {
                                                setNewMenuItem({
                                                    ...newMenuItem,
                                                    itemType: ev.target.value,
                                                });
                                            }}
                                        >
                                            {typesOfFood.map((foodType) => {
                                                return (
                                                    <MenuItem
                                                        key={foodType.id}
                                                        value={foodType.id}
                                                    >
                                                        {foodType.name}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    )}
                                {newMenuItem.type === "drink" &&
                                    typesOfDrink.length && (
                                        <Select
                                            value={
                                                newMenuItem.itemType || "none"
                                            }
                                            onChange={(ev) => {
                                                setNewMenuItem({
                                                    ...newMenuItem,
                                                    itemType: ev.target.value,
                                                });
                                            }}
                                        >
                                            {typesOfDrink.map((drinkType) => {
                                                return (
                                                    <MenuItem
                                                        key={drinkType.id}
                                                        value={drinkType.id}
                                                    >
                                                        {drinkType.name}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    )}
                                <TextField
                                    id="new_food"
                                    label="Item name"
                                    value={newMenuItem.name || ""}
                                    onChange={(ev) => {
                                        setNewMenuItem({
                                            ...newMenuItem,
                                            name: ev.target.value,
                                        });
                                    }}
                                />
                            </React.Fragment>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setCustomMenu({
                                        menuItems: [
                                            ...customMenu.menuItems,
                                            newMenuItem,
                                        ],
                                    });
                                }}
                            >
                                <AddCircleOutlineIcon />
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item lg={6} sx={{ flexGrow: 1 }}>
                        <Typography variant="body1" sx={{ paddingBottom: 2 }}>
                            Menu items
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Item Type</TableCell>
                                        <TableCell>Item Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {customMenu.menuItems.map((item) => {
                                        return (
                                            <React.Fragment key={item.id}>
                                                <TableRow>
                                                    <TableCell>
                                                        {item.type === "none"
                                                            ? "-"
                                                            : item.type}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.itemType}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.name}
                                                    </TableCell>
                                                </TableRow>
                                            </React.Fragment>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
