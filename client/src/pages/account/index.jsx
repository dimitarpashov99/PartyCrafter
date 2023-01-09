import React from "react";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Paper,
    Stack,
} from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import accountTabs from "./account-menus";

const AccountPage = () => {
    const params = useParams();
    return (
        <Paper sx={{ height: "100%" }}>
            <Stack direction="row">
                <List
                    sx={{
                        width: "100%",
                        maxWidth: 240,
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader
                            component="div"
                            id="nested-list-subheader"
                        >
                            My Account
                        </ListSubheader>
                    }
                >
                    {accountTabs?.map((tab) => (
                        <ListItem>
                            <NavLink
                                key={tab.id}
                                to={"/account/" + tab.id}
                                style={{ flexGrow: 1, textDecoration: "none" }}
                            >
                                {({ isActive }) => (
                                    <ListItemButton selected={isActive}>
                                        <ListItemText primary={tab.label} />
                                    </ListItemButton>
                                )}
                            </NavLink>
                        </ListItem>
                    ))}
                </List>
                <Box>
                    {accountTabs?.map((tab) => {
                        if (tab.id === params.id)
                            return <Box>{tab.component}</Box>;
                    })}
                </Box>
            </Stack>
        </Paper>
    );
};

export default AccountPage;
