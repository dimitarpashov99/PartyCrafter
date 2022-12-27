import React from "react";
import { Container, Paper, Tab, Tabs } from "@mui/material";
import tabs from "./tabs";

const AccountPage = () => {
    return (
        <Container>
            <Paper>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    sx={{ borderRight: 1, borderColor: "divider" }}
                >
                    {tabs?.map((tab) => {
                        <Tab key={tab.id} value={tab.id} />;
                    })}
                </Tabs>
            </Paper>
        </Container>
    );
};

export default AccountPage;
