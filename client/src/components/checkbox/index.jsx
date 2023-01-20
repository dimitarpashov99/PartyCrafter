import * as React from "react";
import {
    FormLabel,
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import {
    CheckBoxOutlineBlankOutlined,
    CheckBoxOutlined,
} from "@mui/icons-material";
import Paper from "@mui/material/Paper";

const checkboxStyle = {
    "&:hover": {
        boxShadow: 3,
    },
    "&.Mui-checked": {
        color: "#800080",
    },
    "& .MuiSvgIcon-root": {
        fontSize: "2rem",
    },
};

const formControlLabelStyle = {
    "& .MuiFormControlLabel-label": {
        fontSize: "1.5rem",
    },
};

const CustomCheckboxGroup = (props) => {
    return (
        <Paper sx={{ padding: 4 }}>
            <FormControl
                required
                component="fieldset"
                sx={{ m: 3 }}
                variant="standard"
            >
                <FormLabel component="legend">{props?.label}</FormLabel>
                <FormGroup>
                    {props?.elements?.map((element) => {
                        <FormControlLabel
                            sx={{
                                ...formControlLabelStyle,
                            }}
                            control={
                                <Checkbox
                                    id={element.id}
                                    checkedIcon={<CheckBoxOutlined />}
                                    icon={<CheckBoxOutlineBlankOutlined />}
                                    sx={checkboxStyle}
                                />
                            }
                            label={element.label}
                        />;
                    })}
                </FormGroup>
            </FormControl>
        </Paper>
    );
};

export default CustomCheckboxGroup;
